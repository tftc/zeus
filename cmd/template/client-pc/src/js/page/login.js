/**
 * @file login.js
 * @desc 登陆demo 页面js
 * @author xiaoguang01
 * @date 2015/11/11
 */
zeus.page({
    initDatas: function () {},
    // 初始化部件
    initParts: function () {
        self.parts = {
            $form: $('#loginForm'),
            $hintBox: $('#hintBox')
        };
    },
    // 事件绑定
    bindEvent: function () {
        var $submitBtn = self.parts.$form.find('.submit-btn');
        $submitBtn.on('click', function () {
            self.submitForm();
        });

        var $inputs = self.parts.$form.find('input');
        $inputs.on('click', function () {
            self.removeMsg();
        });

        var $closeBtn = self.parts.$hintBox.find('.close');
        $closeBtn.on('click', function () {
            self.removeMsg();
        });

    },
    // 提交表单
    submitForm: function () {
        var checkResult = self.checkValue();
        if (!checkResult.code) {
            self.showMsg(checkResult.msg);
        }
        else {
            self.setLoginStatus();
            self.parts.$form.submit();
        }
    },
    // 检查属性
    checkValue: function () {
        var hasNull = null;
        var $checkInputs = self.parts.$form.find('.check-null');
        $.each($checkInputs, function (i, item) {
            if ($.trim($(item).val()) === '') {
                hasNull = item;
                return false;
            }

        });
        if (hasNull) {
            return {
                code: 0,
                msg: $(hasNull).data('msg') + '不能为空',
                item: hasNull
            };
        }

        return {
            code: 1
        };

    },
    // 显示提示信息
    showMsg: function (msg) {
        self.parts.$hintBox.find('.hint-msg').html(msg);
        self.parts.$hintBox.show();
    },
    // 消除提示信息
    removeMsg: function () {
        self.parts.$hintBox.find('.hint-msg').html('');
        self.parts.$hintBox.hide();
    },
    // 设置登陆状态,防止二次登陆
    setLoginStatus: function () {
        var $submitButton = self.parts.$form.find('.submit-btn');
        $submitButton.html('<i class="white icon-cog icon-spin"></i> 正在登录…').addClass('disabled');
    }
});
