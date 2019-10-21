import { expect, sinon } from '../../../helpers/chai';
import { UserRouter } from '../../../../api/user/user.router';
import 'mocha';
describe('User routes', () => {
    it('registers /users routes', () => {
        const router: any = {
            route: sinon.stub(),
            post: sinon.stub()
        };

        router.route.returns(router);
        router.post.returns(router);
        new UserRouter().init(router);
        // tslint:disable-next-line:no-unused-expression
        return Promise.all([
            expect(router.route.withArgs('/users')).to.be.calledOnce,
            expect(
                router.post.withArgs(),
                "Expected to be called with ['/users', function]"
            ).to.be.calledOnce
        ]);
    });
});
