const chai = require('chai');
const chaiHttp = require('chai-http');
const { expect } = chai;
chai.use(chaiHttp);

let token = String();

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';


describe('Use Case : Payment', () => {

    it('Login for token', function (done) {
            chai.request('https://localhost:8765/evcharge/api')
                .post('/login')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send({ username: 'smallkoala709', password: 'alexis' })
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res).to.be.an('object');
                    expect(res.body).to.have.property('accessToken');
                    token = res.body['accessToken'];
                    done();
                });
        });

    describe('Payment Page', () => {

        it('Correct parameters - complete check', function (done) {
            chai.request('https://localhost:8765/evcharge/api')
                .get('/PaymentPage/angrycat138')
                .set('x-access-token', token)
                .send()
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res).to.be.an('object');
                    expect(res.body).to.be.an('array');
                    expect(res.body).to.have.length(4);
                    expect(res.body[0]).to.be.an('object');
                    expect(res.body[0]).to.have.property('OwedMoney').equal(337.04);
                    expect(res.body[1]).to.be.an('object');
                    expect(res.body[1]).to.have.property('Points').equal(4194);
                    expect(res.body[2]).to.be.an('object');
                    expect(res.body[2]).to.have.property('MonthlyProgram').equal(null);
                    expect(res.body[3]).to.be.an('object');
                    expect(res.body[3]).to.have.property('Discount').equal(null);
                    done();
                });
        });

        it('Wrong username', function (done) {
            chai.request('https://localhost:8765/evcharge/api')
                .get('/PaymentPage/anycat138')
                .set('x-access-token', token)
                .send()
                .end(function (err, res) {
                    expect(res).to.have.status(402);
                    done();
                });
        });

        it('Parameter Missing', function (done) {
            chai.request('https://localhost:8765/evcharge/api')
                .get('/PaymentPage')
                .set('x-access-token', token)
                .send()
                .end(function (err, res) {
                    expect(res).to.have.status(404);
				    done();
                });
        });

        it('JSON format', function (done) {
            chai.request('https://localhost:8765/evcharge/api')
                .get('/PaymentPage/angrycat138?format=json')
                .set('x-access-token', token)
                .send()
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.type).equal('application/json');
				    done();
                });
        });

        it('CSV format', function (done) {
            chai.request('https://localhost:8765/evcharge/api')
                .get('/PaymentPage/angrycat138?format=csv')
                .set('x-access-token', token)
                .send()
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.type).equal('text/csv');
				    done();
                });
        });

        it('Wrong format', function (done) {
            chai.request('https://localhost:8765/evcharge/api')
                .get('/PaymentPage/angrycat138?format=w')
                .set('x-access-token', token)
                .send()
                .end(function (err, res) {
                    expect(res).to.have.status(400);
				    done();
                });
        });

        it('Have not logged in', function (done) {
            chai.request('https://localhost:8765/evcharge/api')
                .get('/PaymentPage/angrycat138')
                .set('x-access-token', ' ')
                .send()
                .end(function (err, res) {
                    expect(res).to.have.status(401);
				    done();
                });
        });

    });

    describe('Create Payment', ()=> {
        it('Correct parameters - complete check', function (done) {
            chai.request('https://localhost:8765/evcharge/api')
                .post('/CreatePayment/yellowzebra226/5/AmericanExpress/1/2')
                .set('x-access-token', token)
                .send()
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res).to.be.an('object');
                    expect(res.body).to.be.an('array');
                    expect(res.body[0]).to.be.an('object');
                    expect(res.body[0]).to.have.property('EarnedPoints').equal(1);
                    expect(res.body[1]).to.be.an('object');
                    expect(res.body[1]).to.have.property('TotalPoints');
                    done();
                });
        });

        it('Correct parameters - decimal payment money', function (done) {
            chai.request('https://localhost:8765/evcharge/api')
                .post('/CreatePayment/yellowzebra226/8.7/AmericanExpress/1/2')
                .set('x-access-token', token)
                .send()
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res).to.be.an('object');
                    expect(res.body).to.be.an('array');
                    expect(res.body[2]).to.be.an('object');
                    expect(res.body[2]).to.have.property('EarnedPoints').equal(2);
                    expect(res.body[3]).to.be.an('object');
                    expect(res.body[3]).to.have.property('TotalPoints');
                    done();
                });
        });

        it('Non-existing username', function (done) {
            chai.request('https://localhost:8765/evcharge/api')
                .post('/CreatePayment/yellowzra226/5/AmericanExpress/1/2')
                .set('x-access-token', token)
                .send()
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('errno').equal(1452);
                    done();
                });
        });

        it('Negative payment', function (done) {
            chai.request('https://localhost:8765/evcharge/api')
                .post('/CreatePayment/yellowzebra226/-5/AmericanExpress/1/2')
                .set('x-access-token', token)
                .send()
                .end(function (err, res) {
                    expect(res).to.have.status(400);
                    done();
                });
        });

        it('Negative points', function (done) {
            chai.request('https://localhost:8765/evcharge/api')
                .post('/CreatePayment/yellowzebra226/5/AmericanExpress/1/-2')
                .set('x-access-token', token)
                .send()
                .end(function (err, res) {
                    expect(res).to.have.status(400);
                    done();
                });
        });

        it('Decimal points', function (done) {
            chai.request('https://localhost:8765/evcharge/api')
                .post('/CreatePayment/yellowzebra226/5/AmericanExpress/1/2.8')
                .set('x-access-token', token)
                .send()
                .end(function (err, res) {
                    expect(res).to.have.status(400);
                    done();
                });
        });

        it('Non-existing Bank ID', function (done) {
            chai.request('https://localhost:8765/evcharge/api')
                .post('/CreatePayment/yellowzebra226/5/AmericanExpress/1000/2')
                .set('x-access-token', token)
                .send()
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('errno').equal(1452);;
                    done();
                });
        });

        it('Parameter Missing', function (done) {
            chai.request('https://localhost:8765/evcharge/api')
                .post('/CreatePayment/yellowzebra226/5/AmericanExpress/2')
                .set('x-access-token', token)
                .send()
                .end(function (err, res) {
                    expect(res).to.have.status(404);
				    done();
                });
        });

        it('JSON format', function (done) {
            chai.request('https://localhost:8765/evcharge/api')
                .post('/CreatePayment/yellowzebra226/5/AmericanExpress/1/2?format=json')
                .set('x-access-token', token)
                .send()
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.type).equal('application/json');
				    done();
                });
        });

        it('CSV format', function (done) {
            chai.request('https://localhost:8765/evcharge/api')
                .post('/CreatePayment/yellowzebra226/5/AmericanExpress/1/2?format=csv')
                .set('x-access-token', token)
                .send()
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.type).equal('text/csv');
				    done();
                });
        });

        it('Wrong format', function (done) {
            chai.request('https://localhost:8765/evcharge/api')
                .post('/CreatePayment/yellowzebra226/5/AmericanExpress/1/2?format=w')
                .set('x-access-token', token)
                .send()
                .end(function (err, res) {
                    expect(res).to.have.status(400);
				    done();
                });
        });

        it('Have not logged in', function (done) {
            chai.request('https://localhost:8765/evcharge/api')
                .post('/CreatePayment/yellowzebra226/5/AmericanExpress/1/2')
                .set('x-access-token', ' ')
                .send()
                .end(function (err, res) {
                    expect(res).to.have.status(401);
				    done();
                });
        });

    });

});


describe('Use Case : Payment', ()=> {
    it('Log out', function (done) {
            chai.request('https://localhost:8765/evcharge/api')
                .post('/logout')
                .set('x-access-token', token)
                .send()
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    done();
                });
        });
});