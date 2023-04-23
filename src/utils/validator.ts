import { Rule } from 'antd/es/form';

/**验证数字*/
export function validNum(_rule: object, value: number, callback: (err?: string) => void) {
  if (!/^\+?[1-9][0-9]*$/.test(value.toString())) {
    return callback('请输入数字');
  } else {
    return callback();
  }
}

/**验证数字，字母，汉字*/
export function validName(_rule: object, value: string, callback: (err?: string) => void) {
  if (value === null || value === void 0) {
    return callback('名称不能为空');
  } else if (!/^[a-zA-Z0-9\u4e00-\u9fa5]+$/.test(value.toString())) {
    return callback('请输入字母、数字或汉字');
  } else {
    return callback();
  }
}

/**密码校验*/
export const validPassword = (): Rule => ({
  pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,20}$/,
  max: 20,
  min: 8,
  message: '请设置8-20位密码，同时包含数字和英文字母',
});

/**邮箱校验*/
export const validateEmail = (): Rule => ({
  required: true,
  pattern: /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/,
  message: '邮箱格式不正确',
  validateTrigger: 'onChange',
});

/**验证英文大小写和数字*/
export const validateEnNumber = (message: string): Rule => ({
  required: false,
  pattern: /^[a-zA-Z0-9]+$/,
  message,
  validateTrigger: 'onChange',
});

/**手机号校验*/
export const validatePhone = (): Rule => ({
  pattern: /^1[3456789]\d{9}$/,
  required: true,
  validateTrigger: 'onChange',
  message: '手机号格式不正确',
});

/**验证手机号和座机号*/
export const mpValidate = (): Rule => ({
  pattern: /^1[3456789]\d{9}$|^(\(\d{3,4}\)|\d{3,4}-|\s)\d{7,14}$/,
  required: false,
  validateTrigger: 'onChange',
  message: '电话号码格式不正确',
});

/**验证国际号码*/
export const internationalPValidate = (): Rule => ({
  pattern: /^[(0-9)|\\+|\\-]+$/,
  required: false,
  validateTrigger: 'onChange',
  message: '电话号码格式不正确',
});

/**验证手机号(可以为空)*/
export function validatePhoneNull(_rule: object, value: number, callback: (err?: string) => void) {
  if (value === void 0 || value === null || value.toString().length === 0) {
    return callback();
  } else {
    if (!/^1[3456789]\d{9}$/.test(value.toString())) {
      return callback('请输入正确手机号');
    }
    return callback();
  }
}

/**旧密码*/
export const oldPasswordCheck = (): Rule => ({
  pattern: /^[a-zA-Z0-9~!_@#$%^&*,.;:’”?/]{6,20}$/,
  message: '旧密码长度6-20，大小写字母、数字、英文符号（~!@#$%^&*,.;:’”?/）',
});

/**新密码*/
export const newPasswordCheck = (): Rule => ({
  pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,20}$/,
  message: '请设置8-20位密码，同时包含数字和英文字母',
});

/**身份证校验*/
export const validIdentityCard = (): Rule => ({
  pattern: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/,
  message: '非法身份证',
});


/**生日日期格式校验*/
export const validBirthday = (): Rule => ({
  pattern: /((^((1[8-9]\d{2})|([2-9]\d{3}))([-\\/\\._])(10|12|0?[13578])([-\\/\\._])(3[01]|[12][0-9]|0?[1-9])$)|(^((1[8-9]\d{2})|([2-9]\d{3}))([-\\/\\._])(11|0?[469])([-\\/\\._])(30|[12][0-9]|0?[1-9])$)|(^((1[8-9]\d{2})|([2-9]\d{3}))([-\\/\\._])(0?2)([-\\/\\._])(2[0-8]|1[0-9]|0?[1-9])$)|(^([2468][048]00)([-\\/\\._])(0?2)([-\\/\\._])(29)$)|(^([3579][26]00)([-\\/\\._])(0?2)([-\\/\\._])(29)$)|(^([1][89][0][48])([-\\/\\._])(0?2)([-\\/\\._])(29)$)|(^([2-9][0-9][0][48])([-\\/\\._])(0?2)([-\\/\\._])(29)$)|(^([1][89][2468][048])([-\\/\\._])(0?2)([-\\/\\._])(29)$)|(^([2-9][0-9][2468][048])([-\\/\\._])(0?2)([-\\/\\._])(29)$)|(^([1][89][13579][26])([-\\/\\._])(0?2)([-\\/\\._])(29)$)|(^([2-9][0-9][13579][26])([-\\/\\._])(0?2)([-\\/\\._])(29)$))/,
  message: '日期不正确',
});

/**校验文件名是否是excel文件，仅认可.xls和.xlsx文件*/
export const isExcel = (fileName: string) => {
  return /^.*\.(xls(x)?)$/.test(fileName);
};

