import { expect, sinon } from '../../../helpers/chai';
import { ConversationController } from '../../../../api/conversation/conversation.controller';
import { BaseError } from '../../../../errors/BaseError';
import httpStatus from 'http-status';
import Conversation from '../../../../api/conversation/conversation.model';
import 'mocha';

describe('Conversation Controller', () => {
    it('create', async () => {
        const conversationRepository: any = {
            findOrCreate: sinon.stub()
        };
        const req: any = {
            body: {
                name: 'test'
            }
        };

        const res: any = {
            status: sinon.stub(),
            json: sinon.spy()
        };

        const next: any = sinon.spy();

        const conversation: Conversation = {
            id: undefined,
            title: 'test',
            created_at: new Date(),
            updated_at: new Date(),
            is_deleted: 0
        };

        conversationRepository.findOrCreate.returns(conversation);
        res.status.withArgs(httpStatus.OK).returns(res);
        await new ConversationController().create(req, res, next, conversationRepository);

        expect(res.status.withArgs(200)).to.be.calledOnce;
        expect(res.json.withArgs(conversation)).to.be.calledOnce;
    });

    it('throw BaseError when error in database', async () => {
        const conversationRepository: any = {
            findOrCreate: sinon.stub()
        };
        const req: any = {};
        const res: any = {};
        const next: any = sinon.spy();
        conversationRepository.findOrCreate.rejects(BaseError);

        await new ConversationController().create(req, res, next, conversationRepository);

        expect(next.withArgs(sinon.match.instanceOf(BaseError))).to.be.not
            .called;
    });

    it('Get by id', async () => {
        const conversationRepository: any = {
            findByIds: sinon.stub()
        };
        const req: any = {};
        const res: any = {};
        const next: any = sinon.spy();
        conversationRepository.findByIds.rejects(BaseError);

        await new ConversationController().create(req, res, next, conversationRepository);

        expect(next.withArgs(sinon.match.instanceOf(BaseError))).to.be.not
            .called;
    });
});
