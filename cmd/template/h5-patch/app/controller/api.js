/**
 * @file api.js
 * @desc api控制器
 * @author xiaoguang01
 * @date 2015/11/2
 */
module.exports = {
    getCrowdList: function *() {
        var crowdList = [
				{
					ifFirst: true,
					title: '老人专享项目T001-15010-27',
					percent: '7.00',
					dateTime: '365',
					base: '起投300,000元',
					total: '总额30万',
					desc: '一次性还本息',
					status: '1'
				},
				{
					ifFirst: false,
					title: '新人专享项目T002-15010-27',
					percent: '8.00',
					dateTime: '100',
					base: '起投2,000元',
					total: '总额10万',
					desc: '一次性还本息',
					status: '2'
				},
				{
					ifFirst: true,
					title: '新人专享项目T002-15010-27',
					percent: '8.00',
					dateTime: '100',
					base: '起投2,000元',
					total: '总额10万',
					desc: '一次性还本息',
					status: '2'
				},
				{
					ifFirst: false,
					title: '新人专享项目T002-15010-27',
					percent: '8.00',
					dateTime: '100',
					base: '起投2,000元',
					total: '总额10万',
					desc: '一次性还本息',
					status: '2'
				},
				{
					ifFirst: false,
					title: '新人专享项目T002-15010-27',
					percent: '8.00',
					dateTime: '100',
					base: '起投2,000元',
					total: '总额10万',
					desc: '一次性还本息',
					status: '2'
				},
				{
					ifFirst: false,
					title: '新人专享项目T002-15010-27',
					percent: '8.00',
					dateTime: '100',
					base: '起投2,000元',
					total: '总额10万',
					desc: '一次性还本息',
					status: '2'
				}
			]
        yield this.api(crowdList);
    }
};

