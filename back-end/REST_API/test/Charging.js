const chai = require('chai');
const chaiHttp = require('chai-http');
const { expect } = chai;
chai.use(chaiHttp);

let token = String();

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';


describe('Use Case : Charging', () => {

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

    describe('Vehicle', () => {

        it('Correct parameters - complete check', function (done) {
            chai.request('https://localhost:8765/evcharge/api')
                .get('/vehicle/059c028d-b2a6-4a8d-947a-158c7537b290')
                .set('x-access-token', token)
                .send()
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res).to.be.an('object');
                    expect(res.body).to.be.an('array');
                    expect(res.body).to.have.length(1);
                    expect(res.body[0]).to.have.property('ID').equal('059c028d-b2a6-4a8d-947a-158c7537b290');
                    expect(res.body[0]).to.have.property('plates').equal('AQF-260');
                    expect(res.body[0]).to.have.property('model').equal('e-tron 50');
                    expect(res.body[0]).to.have.property('usable_battery_size').equal(65);
                    expect(res.body[0]).to.have.property('Car_Ownerusername').equal('beautifuldog511');
                    expect(res.body[0]).to.have.property('Car_ManufacturerID').equal(3);
                    done();
                });
        });

        it('Wrong Car ID', function (done) {
            chai.request('https://localhost:8765/evcharge/api')
                .get('/vehicle/kat')
                .set('x-access-token', token)
                .send()
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('array').that.is.empty;
                    done();
                });
        });

        it('Parameter Missing', function (done) {
            chai.request('https://localhost:8765/evcharge/api')
                .get('/vehicle')
                .set('x-access-token', token)
                .send()
                .end(function (err, res) {
                    expect(res).to.have.status(404);
				    done();
                });
        });

        it('Have not logged in', function (done) {
            chai.request('https://localhost:8765/evcharge/api')
                .get('/vehicle/059c028d-b2a6-4a8d-947a-158c7537b290')
                .set('x-access-token', ' ')
                .send()
                .end(function (err, res) {
                    expect(res).to.have.status(401);
				    done();
                });
        });

    });

    describe('Vehicle of Owner', ()=> {
        
        it('Correct parameters - complete check', function (done) {
            chai.request('https://localhost:8765/evcharge/api')
                .get('/vehicle/ofOwner/angrycat138')
                .set('x-access-token', token)
                .send()
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res).to.be.an('object');
                    expect(res.body).to.be.an('array');
                    expect(res.body).to.have.length(1);
                    expect(res.body[0]).to.have.property('ID').equal('7dbad968-7058-4440-9c8f-8f483cdd973a');
                    expect(res.body[0]).to.have.property('plates').equal('OQC-664');
                    expect(res.body[0]).to.have.property('model').equal('Model 3');
                    expect(res.body[0]).to.have.property('usable_battery_size').equal(73);
                    expect(res.body[0]).to.have.property('Car_Ownerusername').equal('angrycat138');
                    expect(res.body[0]).to.have.property('Car_ManufacturerID').equal(1);
                    done();
                });
        });

        it('Wrong username', function (done) {
            chai.request('https://localhost:8765/evcharge/api')
                .get('/vehicle/ofOwner/anycat138')
                .set('x-access-token', token)
                .send()
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('array').that.is.empty;
                    done();
                });
        });

        it('Have not logged in', function (done) {
            chai.request('https://localhost:8765/evcharge/api')
                .get('/vehicle/ofOwner/angrycat138')
                .set('x-access-token', ' ')
                .send()
                .end(function (err, res) {
                    expect(res).to.have.status(401);
				    done();
                });
        });

    });

    describe('Charging data for one Charging', ()=>{
        it('Correct parameters - complete check', function (done) {
            chai.request('https://localhost:8765/evcharge/api')
                .get('/charging/5c3fda9df9af8b0d99c6fd60')
                .set('x-access-token', token)
                .send()
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res).to.be.an('object');
                    expect(res.body).to.be.an('array');
                    expect(res.body).to.have.length(1);
                    expect(res.body[0]).to.have.property('ID').equal('5c3fda9df9af8b0d99c6fd60');
                    expect(res.body[0]).to.have.property('connection_time').equal('Tue, 01 Jan 2019 03:45:49 GMT');
                    expect(res.body[0]).to.have.property('disconnection_time').equal('Tue, 01 Jan 2019 17:57:23 GMT');
                    expect(res.body[0]).to.have.property('done_charging_time').equal('Tue, 01 Jan 2019 10:40:45 GMT');
                    expect(res.body[0]).to.have.property('kWh_delivered').equal(43.11);
                    expect(res.body[0]).to.have.property('protocol').equal('OSCP');
                    expect(res.body[0]).to.have.property('battery_percent_begin').equal(15);
                    expect(res.body[0]).to.have.property('battery_percent_end').equal(79);
                    expect(res.body[0]).to.have.property('the_date').equal('1/1/2019 03:45 AM');
                    expect(res.body[0]).to.have.property('charging_price').equal(10.65);
                    expect(res.body[0]).to.have.property('still_owed').equal(10.65);
                    expect(res.body[0]).to.have.property('km_total').equal(25272);
                    expect(res.body[0]).to.have.property('km_between_charges').equal(513);
                    expect(res.body[0]).to.have.property('Car_Ownerusername').equal('beautifullion990');
                    expect(res.body[0]).to.have.property('CarID').equal('d8c11860-a582-4784-9e58-d29e94a67fc2');
                    expect(res.body[0]).to.have.property('SpaceStationID').equal('2-39-138-29');
                    expect(res.body[0]).to.have.property('Spacename').equal('CA-660');
                    expect(res.body[0]).to.have.property('supplierID').equal(10);
                    done();
                });
        });

        it('Wrong charging ID', function (done) {
            chai.request('https://localhost:8765/evcharge/api')
                .get('/charging/5c3fd8b0d99c6fd60')
                .set('x-access-token', token)
                .send()
                .end(function (err, res) {
                    expect(res).to.have.status(402);
                    done();
                });
        });

        
        it('JSON format', function (done) {
            chai.request('https://localhost:8765/evcharge/api')
                .get('/charging/5c3fda9df9af8b0d99c6fd60?format=json')
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
                .get('/charging/5c3fda9df9af8b0d99c6fd60?format=csv')
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
                .get('/charging/5c3fda9df9af8b0d99c6fd60?format=wrong')
                .set('x-access-token', token)
                .send()
                .end(function (err, res) {
                    expect(res).to.have.status(400);
				    done();
                });
        });


        it('Have not logged in', function (done) {
            chai.request('https://localhost:8765/evcharge/api')
                .get('/charging/5c3fda9df9af8b0d99c6fd60')
                .set('x-access-token', ' ')
                .send()
                .end(function (err, res) {
                    expect(res).to.have.status(401);
				    done();
                });
        });
    });

    describe('Charging data for Vehicle of Owner', ()=>{
        it('Correct parameters - complete check', function (done) {
            chai.request('https://localhost:8765/evcharge/api')
                .get('/charging/beautifulcat879/430ca2cd-bd4b-482a-8776-85a8c7d3435c')
                .set('x-access-token', token)
                .send()
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res).to.be.an('object');
                    expect(res.body).to.be.an('array');
                    expect(res.body).to.have.length(1);
                    expect(res.body[0]).to.have.property('ID').equal('5bc9160af9af8b0dad3c06af');
                    expect(res.body[0]).to.have.property('kWh_delivered').equal(2.16);
                    expect(res.body[0]).to.have.property('protocol').equal('LIN');
                    expect(res.body[0]).to.have.property('battery_percent_begin').equal(99);
                    expect(res.body[0]).to.have.property('battery_percent_end').equal(99);
                    expect(res.body[0]).to.have.property('charging_price').equal(0.37);
                    done();
                });
        });

        it('Wrong vehicle ID', function (done) {
            chai.request('https://localhost:8765/evcharge/api')
                .get('/charging/beautifulcat879/katc')
                .set('x-access-token', token)
                .send()
                .end(function (err, res) {
                    expect(res).to.have.status(402);
                    done();
                });
        });

        it('Wrong username', function (done) {
            chai.request('https://localhost:8765/evcharge/api')
                .get('/charging/beautifulc/430ca2cd-bd4b-482a-8776-85a8c7d3435c')
                .set('x-access-token', token)
                .send()
                .end(function (err, res) {
                    expect(res).to.have.status(402);
                    done();
                });
        });

        
        it('JSON format', function (done) {
            chai.request('https://localhost:8765/evcharge/api')
                .get('/charging/beautifulcat879/430ca2cd-bd4b-482a-8776-85a8c7d3435c?format=json')
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
                .get('/charging/beautifulcat879/430ca2cd-bd4b-482a-8776-85a8c7d3435c?format=csv')
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
                .get('/charging/beautifulcat879/430ca2cd-bd4b-482a-8776-85a8c7d3435c?format=wrong')
                .set('x-access-token', token)
                .send()
                .end(function (err, res) {
                    expect(res).to.have.status(400);
				    done();
                });
        });


        it('Have not logged in', function (done) {
            chai.request('https://localhost:8765/evcharge/api')
                .get('/charging/beautifulcat879/430ca2cd-bd4b-482a-8776-85a8c7d3435c')
                .set('x-access-token', ' ')
                .send()
                .end(function (err, res) {
                    expect(res).to.have.status(401);
				    done();
                });
        });
    });

    describe('Station Points',()=>{
        it('Correct parameters - complete check', function (done) {
            chai.request('https://localhost:8765/evcharge/api')
                .get('/StationPoints/2-39-131-565')
                .set('x-access-token', token)
                .send()
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res).to.be.an('object');
                    expect(res.body).to.be.an('array');
                    expect(res.body).to.have.length(10);
                    expect(res.body[0]).to.be.an('object');
                    expect(res.body[0]).to.have.property('Name').equal('AA-859');
                    expect(res.body[0]).to.have.property('Active').equal(1);
                    expect(res.body[0]).to.have.property('Taken').equal(0);

                    done();
                });
        });

        it('Wrong Station ID', function (done) {
            chai.request('https://localhost:8765/evcharge/api')
                .get('/StationPoints/31-565')
                .set('x-access-token', token)
                .send()
                .end(function (err, res) {
                    expect(res).to.have.status(402);
                    done();
                });
        });

        it('Parameter Missing', function (done) {
            chai.request('https://localhost:8765/evcharge/api')
                .get('/StationPoints')
                .set('x-access-token', token)
                .send()
                .end(function (err, res) {
                    expect(res).to.have.status(404);
                    done();
                });
        });

        
        it('JSON format', function (done) {
            chai.request('https://localhost:8765/evcharge/api')
                .get('/StationPoints/2-39-131-565?format=json')
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
                .get('/StationPoints/2-39-131-565?format=csv')
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
                .get('/StationPoints/2-39-131-565?format=wrong')
                .set('x-access-token', token)
                .send()
                .end(function (err, res) {
                    expect(res).to.have.status(400);
				    done();
                });
        });


        it('Have not logged in', function (done) {
            chai.request('https://localhost:8765/evcharge/api')
                .get('/StationPoints/2-39-131-565')
                .set('x-access-token', ' ')
                .send()
                .end(function (err, res) {
                    expect(res).to.have.status(401);
				    done();
                });
        });
    });

});


describe('Use Case : Charging', ()=> {
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