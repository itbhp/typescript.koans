import { expect } from "chai";
import * as sinon from "sinon";
import * as _ from "../src/01_intro";

describe("01_intro", () => {
  describe("addNumbers", () => {
    it("should add two numbers", () => {
      expect(_.addNumbers(1, 2)).to.be.equal(3);
    });
  });

  describe("addStrings", () => {
    it("should add two strings", () => {
      expect(_.addStrings("hello", "world")).to.be.equal("helloworld");
    });
  });

  describe("identity", () => {
    it("should return the first argument it receives", () => {
      expect(_.identity<number>(1)).to.be.equal(1);
      expect(_.identity<number>(2)).to.be.equal(2);
      expect(_.identity<string>('hello world')).to.be.equal('hello world');
      expect(_.identity<Object>({})).to.deep.equal({});
    });

    context("when called without arguments", () => {
      it("should return undefined ", () => {
        expect(_.identity()).to.be.equal(undefined);
      });
    });
  });

  describe("attempt", () => {
    context("when function throws an error", () => {
      it("should return error", () => {
        const err = new Error();
        const func = sinon.stub().throws(err);
        expect(_.attempt(func)).to.be.equal(err);
      });
    });

    context("when function does not throw an error", () => {
      it("should return result", () => {
        const result = 123;
        const func = sinon.stub().returns(result);
        expect(_.attempt(func)).to.be.equal(result);
      });
    });

    it("should apply function with passed in arguments", () => {
      const func = sinon.spy();
      _.attempt(func, 1, 2, 3);
      sinon.assert.calledWithExactly(func, 1, 2, 3);
      _.attempt(func, {}, 'Hackages', 'HvA', 3);
      sinon.assert.calledWithExactly(func, {}, 'Hackages', 'HvA', 3);
    });
  });

  describe("noop", () => {
    it("should return undefined", () => {
      expect(_.noop()).to.be.equal(undefined);
    });

    context("when called with arguments", () => {
      it("should return undefined", () => {
        expect(_.noop(1, 2, 3)).to.be.equal(undefined);
      });
    });
  });

  describe("times", () => {
    it("should invoke iteratee n times", () => {
      const iteratee = sinon.spy();
      _.times<number>(10, iteratee);
      sinon.assert.callCount(iteratee, 10);
    });

    it("should call iteratee with current count", () => {
      const iteratee = sinon.spy();
      _.times<number>(3, iteratee);
      expect(iteratee.getCall(0).args).to.deep.equal([0]);
      expect(iteratee.getCall(1).args).to.deep.equal([1]);
      expect(iteratee.getCall(2).args).to.deep.equal([2]);
    });

    it("should return array of iteratee results", () => {
      expect(_.times<number>(3, n => n + 1)).to.deep.equal([1, 2, 3]);
    });
  });

  describe("constant", () => {
    it("should return a function that returns the supplied value", () => {
      expect(_.constant<number>(1)()).to.be.equal(1);
      expect(_.constant<string>("hello")()).to.be.equal("hello");
    });
  });
});
