var email = require('../../lib/email');

describe('Email lib', function() {
	it('will email a notification with stale repos', function() {
		var mail, clientMock;

		mail = new email('test@test.com', 'test-from@test.com');
		clientMock = function(options) {
			expect(options).toEqual({
				from: 'test-from@test.com',
				to: 'test@test.com',
				subject: 'Drill Sergeant Stale Pull Request Report',
  				html: '<h1>Drill Sergeant</h1>\n<h2>Stale Pull Request Report</h2>\n\n\n\t<h4>zumba/repository</h4>\n\t<ul>\n\t\n\t\t<li><a href="https://github/zumba/repository/pull/19">Some pull request</a></li>\n\t\n\t</ul>\n\n'
			});
		};
		mail.setClient(clientMock);
		mail.notify([
			{
				repo: 'zumba/repository',
				prs: [{
					created_at: new Date().toISOString(),
					html_url: 'https://github/zumba/repository/pull/19',
					title: 'Some pull request'
				}]
			}
		]);
	});
});
