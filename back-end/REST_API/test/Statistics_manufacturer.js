/*const chai = require('chai');
const chaiHttp = require('chai-http');

const { expect } = chai;

chai.use(chaiHttp);

let token = String();

describe('Use Case : Statistics Manufacturer', ()=>{

    describe('SessionsPerManufacturer', ()=>{

        it('Correct parameters', function (done) {
            chai.request('http://localhost:8765/evcharge/api')
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

    });
    
});*/