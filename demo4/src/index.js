import _ from 'lodash-es'; // 使用lodash esm版本，因为rollup默认只能处理esm模块
import { log } from './logger';
import message from './message';

const msg = message.hi;

log(msg);
log(_.camelCase('hello world'));
