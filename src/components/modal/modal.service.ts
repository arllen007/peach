/**
 * Created by bjpengzhilong on 2017/9/5.
 */
import {
  Injectable,
  ComponentRef,
  ComponentFactory,
  ApplicationRef,
  Type,
  ComponentFactoryResolver,
  ModuleWithComponentFactories
} from '@angular/core';

import { ConfirmComponent } from './confirm.component';

export interface ConfigInterface {
  title?: any;
}

@Injectable()
export class ModalService {
  _confirmCompFactory: ComponentFactory<ConfirmComponent>;

  constructor(private _appRef: ApplicationRef, private _cfr: ComponentFactoryResolver) {
    this._confirmCompFactory = this._cfr.resolveComponentFactory(ConfirmComponent);
  }

  private _initConfig(config: Object, options: Object = {}): Object {
    const props = {};
    const optionalParams: string[] = [
      'componentParams', // 将componentParams放在第一位是因为必须在content赋值前进行赋值
      'visible',
      'title',
      'content',
      'footer',
      'width',
      'zIndex',
      'okText',
      'cancelText',
      'style',
      'class',
      'onOk',
      'onCancel',
      'closable',
      'maskClosable',
      'wrapClassName',
      'iconType',
      'icon'
    ];

    config = Object.assign(options, config);
    optionalParams.forEach(key => {
      if (config[ key ] !== undefined) {
        const modalKey = 'nw' + key.replace(/^\w{1}/, (a) => {
            return a.toLocaleUpperCase();
          });
        props[ modalKey ] = config[ key ];
      }
    });

    props[ 'onOk' ] = this._getConfirmCb(props[ 'nwOnOk' ]);
    props[ 'onCancel' ] = this._getConfirmCb(props[ 'nwOnCancel' ]);
    delete props[ 'nwOnOk' ];
    delete props[ 'nwOnCancel' ];
    return props;
  }

  private _getConfirmCb(fn?: Function): Function {
    return (_close) => {
      if (fn) {
        const ret = fn();
        if (!ret) {
          _close();
        } else if (ret.then) {
          ret.then(_close);
        }
      } else {
        _close();
      }
    };
  }

  private _open(props, factory: ComponentFactory<any>) {
    document.body.insertBefore(document.createElement(factory.selector), document.body.firstChild);

    let customComponentFactory: ComponentFactory<any>;
    let compRef: ComponentRef<any>;
    let instance: any;
    let subject: any;

    if (props[ 'content'] instanceof Type) {
      customComponentFactory = this._cfr.resolveComponentFactory(props[ 'content' ]);

      props[ 'content' ] = customComponentFactory;
    }

    compRef = this._appRef.bootstrap(factory);
    instance = compRef.instance;
    subject = instance.subject;

    [ 'onOk', 'onCancel' ].forEach((eventType: string) => {
      subject.on(eventType, () => {
       const eventHandler = props[ eventType ];
       if (eventHandler) {
         eventHandler(() => {
           instance.nwVisible = false;
           setTimeout(() => {
             compRef.destroy();
           }, 1);
         });
       }
      });
    });

    Object.assign(instance, props, {
      nwVisible: true
    });

    return subject;
  }

  private _openConfirm(cfg) {
    const props = this._initConfig(cfg);
    return this._open(props, this._confirmCompFactory);
  }

  success(props) {
    const config = Object.assign({
      okText: '确定',
      icon: 'icon-success'
    }, props);

    return this._openConfirm(config);
  }

  alert(props) {
    const config = Object.assign({
      okText: '确定',
      icon: 'icon-error'
    }, props);

    return this._openConfirm(config);
  }

  confirm(props) {
    const config = Object.assign({
      okText: '确定',
      cancelText: '取消',
      icon: 'icon-confirm'
    }, props);

    return this._openConfirm(config);
  }
}
