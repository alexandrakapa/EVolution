const chai = require('chai');
const chaiHttp = require('chai-http');
const { expect } = chai;
chai.use(chaiHttp);

let token = String();

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';


describe('Log Tests', () => {
    describe('Login', () => {
        it('Correct credentials', function (done) {
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

        it('Username missing', function (done) {
            chai.request('https://localhost:8765/evcharge/api')
                .post('/login')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send({ password: 'alexis' })
                .end(function (err, res) {
                    expect(res).to.have.status(400);
                    expect(res).to.be.an('object');
                    expect(res.body).to.have.property('isAuth').equal(false);
                    expect(res.body).to.have.property('message').equal('Auth failed, username field is required');
                    done();
                });
        });

        it('Password missing', function (done) {
            chai.request('https://localhost:8765/evcharge/api')
                .post('/login')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send({ username: 'smallkoala709'})
                .end(function (err, res) {
                    expect(res).to.have.status(400);
                    expect(res).to.be.an('object');
                    expect(res.body).to.have.property('isAuth').equal(false);
                    expect(res.body).to.have.property('message').equal('Auth failed, password field is required');
                    done();
                });
        });

        it('Wrong username', function (done) {
            chai.request('https://localhost:8765/evcharge/api')
                .post('/login')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send({ username: 'smallkoala', password: 'alexis' })
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res).to.be.an('object');
                    expect(res.body).to.have.property('isAuth').equal(false);
                    expect(res.body).to.have.property('message').equal('Auth failed, username not found');
                    done();
                });
        });

        it('Wrong password', function (done) {
            chai.request('https://localhost:8765/evcharge/api')
                .post('/login')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send({ username: 'smallkoala709', password: 'al' })
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res).to.be.an('object');
                    expect(res.body).to.have.property('isAuth').equal(false);
                    expect(res.body).to.have.property('message').equal("password doesn't match");
                    done();
                });
        });
    });

    describe('Logout', () => {
        it('User was logged in', function (done) {
            chai.request('https://localhost:8765/evcharge/api')
                .post('/logout')
                .set('x-access-token', token)
                .send()
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    done();
                });
        });

        it("User wasn't logged in", function (done) {
            chai.request('https://localhost:8765/evcharge/api')
                .post('/logout')
                .set('x-access-token', '')
                .send()
                .end(function (err, res) {
                    expect(res).to.have.status(401);
                    expect(res.text).equal('Not authorized');
                    done();
                });
        });
    });
});