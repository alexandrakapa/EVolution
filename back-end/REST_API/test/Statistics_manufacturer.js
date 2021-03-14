const chai = require('chai');
const chaiHttp = require('chai-http');
const { expect } = chai;
chai.use(chaiHttp);

let token = String();

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';


describe('Use Case : Statistics Manufacturer', ()=>{

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

    describe('SessionsPerManufacturer', ()=>{

        it('Correct parameters - complete check', function (done) {
            chai.request('https://localhost:8765/evcharge/api')
                .get('/SessionsPerManufacturer/1  /93332/20200304/20200306')
                .set('x-access-token', token)
                .send()
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.type).equal('application/json');
                    expect(res).to.be.an('object');
                    expect(res.body).to.be.an('array');
                    expect(res.body[0]).to.be.an('object');
                    expect(res.body[0]).to.have.property('ManufacturerID').equal(1);
                    expect(res.body[1]).to.be.an('object');
                    expect(res.body[1]).to.have.property('ManufacturerName').equal('Tesla');
                    expect(res.body[2]).to.be.an('object');
                    expect(res.body[2]).to.have.property('RequestTimestamp');
                    expect(res.body[3]).to.be.an('object');
                    expect(res.body[3]).to.have.property('PeriodFrom').equal('2020-03-04');
                    expect(res.body[4]).to.be.an('object');
                    expect(res.body[4]).to.have.property('PeriodTo').equal('2020-03-06');
                    expect(res.body[5]).to.be.an('object');
                    expect(res.body[5]).to.have.property('NumberOfChargingSessions').equal(1);
                    expect(res.body[6]).to.be.an('array');
                    expect(res.body[6]).to.have.length(1);
                    expect(res.body[6][0]).to.have.property('SessionIndex').equal(1);
                    expect(res.body[6][0]).to.have.property('SessionID').equal('5e756020f9af8b7bfd91e218');
                    expect(res.body[6][0]).to.have.property('CarID').equal('908e578f-f890-4716-93e8-7c0f75e46bb5');
                    expect(res.body[6][0]).to.have.property('Model').equal('Model X');
                    expect(res.body[6][0]).to.have.property('UsableBatterySize').equal(90);
                    expect(res.body[6][0]).to.have.property('StartedOn').equal('2020-03-04 17:36:02');
                    expect(res.body[6][0]).to.have.property('FinishedOn').equal('2020-03-05 02:18:46');
                    expect(res.body[6][0]).to.have.property('Protocol').equal('OCPP');
                    expect(res.body[6][0]).to.have.property('EnergyDelivered').equal(14.23);
                    expect(res.body[6][0]).to.have.property('BatteryPercentBegin').equal(65);
                    expect(res.body[6][0]).to.have.property('BatteryPercentEnd').equal(75);
                    expect(res.body[6][0]).to.have.property('kmTotal').equal(84308);
                    expect(res.body[6][0]).to.have.property('kmBetweenCharges').equal(551);
                    expect(res.body[6][0]).to.have.property('StationAddress').equal('Lake Casitas Municipal Water District - Recreational Area Casitas Pass Rd & Baldwin Rd Oak View CA, 93022, United States');
				    done();
                });
        });

        it('Manufacturer invalid ID', function (done) {
            chai.request('https://localhost:8765/evcharge/api')
                .get('/SessionsPerManufacturer/kat/93332/20200304/20200306')
                .set('x-access-token', token)
                .send()
                .end(function (err, res) {
                    expect(res).to.have.status(400);
                    expect(res.text).equal('Bad Request : Invalid Manufacturer ID');
				    done();
                });
        });

        it('Manufacturer invalid ID (number followed by string)', function (done) {
            chai.request('https://localhost:8765/evcharge/api')
                .get('/SessionsPerManufacturer/9 kat/93332/20200304/20200306')
                .set('x-access-token', token)
                .send()
                .end(function (err, res) {
                    expect(res).to.have.status(400);
                    expect(res.text).equal('Bad Request : Invalid Manufacturer ID');
				    done();
                });
        });

        it('Manufacturer invalid region', function (done) {
            chai.request('https://localhost:8765/evcharge/api')
                .get('/SessionsPerManufacturer/1/934332/20200304/20200306')
                .set('x-access-token', token)
                .send()
                .end(function (err, res) {
                    expect(res).to.have.status(400);
                    expect(res.text).equal('Bad Request : Invalid region.');
				    done();
                });
        });

        it('Manufacturer invalid region with char', function (done) {
            chai.request('https://localhost:8765/evcharge/api')
                .get('/SessionsPerManufacturer/1/9g327/20200304/20200306')
                .set('x-access-token', token)
                .send()
                .end(function (err, res) {
                    expect(res).to.have.status(400);
                    expect(res.text).equal('Bad Request : Invalid region.');
				    done();
                });
        });

        it('Invalid from date', function (done) {
            chai.request('https://localhost:8765/evcharge/api')
                .get('/SessionsPerManufacturer/1/94327/2000u304/20200306')
                .set('x-access-token', token)
                .send()
                .end(function (err, res) {
                    expect(res).to.have.status(400);
                    expect(res.text).equal('Bad Request : Invalid Dates');
				    done();
                });
        });

        it('Invalid to date', function (done) {
            chai.request('https://localhost:8765/evcharge/api')
                .get('/SessionsPerManufacturer/1/94327/20010104/20030230')
                .set('x-access-token', token)
                .send()
                .end(function (err, res) {
                    expect(res).to.have.status(400);
                    expect(res.text).equal('Bad Request : Invalid Dates');
				    done();
                });
        });

        it('From Date > To Date', function (done) {
            chai.request('https://localhost:8765/evcharge/api')
                .get('/SessionsPerManufacturer/1/94327/20010104/20001104')
                .set('x-access-token', token)
                .send()
                .end(function (err, res) {
                    expect(res).to.have.status(400);
                    expect(res.text).equal('Bad Request : Starting Period Date must precede Ending Period Date');
				    done();
                });
        });

        it('JSON format', function (done) {
            chai.request('https://localhost:8765/evcharge/api')
                .get('/SessionsPerManufacturer/1/94327/20010104/20081104?format=json')
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
                .get('/SessionsPerManufacturer/1/94327/20010104/20081104?format=csv')
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
                .get('/SessionsPerManufacturer/1/94327/20010104/20081104?format=wrong')
                .set('x-access-token', token)
                .send()
                .end(function (err, res) {
                    expect(res).to.have.status(400);
				    done();
                });
        });

        it('Have not logged in', function (done) {
            chai.request('https://localhost:8765/evcharge/api')
                .get('/SessionsPerManufacturer/1/94327/20010104/20001104')
                .set('x-access-token', ' ')
                .send()
                .end(function (err, res) {
                    expect(res).to.have.status(401);
				    done();
                });
        });


    });

    describe('Consumption', ()=>{

        it('Correct parameters - complete check', function (done) {
            chai.request('https://localhost:8765/evcharge/api')
                .get('/report_consumption/Tesla/20200101/20201010')
                .set('x-access-token', token)
                .send()
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.type).equal('application/json');
                    expect(res.body).to.be.an('array');
                    expect(res.body[0]).to.be.an('object');
                    expect(res.body[0]).to.have.property('EnergyConsumption').equal(1220.95);
                    expect(res.body[0]).to.have.property('Model').equal('Model S');
                    expect(res.body[1]).to.be.an('object');
                    expect(res.body[1]).to.have.property('EnergyConsumption').equal(1617.37);
                    expect(res.body[1]).to.have.property('Model').equal('Model X');
                    expect(res.body[2]).to.be.an('object');
                    expect(res.body[2]).to.have.property('EnergyConsumption').equal(623.02);
                    expect(res.body[2]).to.have.property('Model').equal('Model 3');
				    done();
                });
        });

        it('Invalid Dates', function (done) {
            chai.request('https://localhost:8765/evcharge/api')
                .get('/report_consumption/Tesla/2003101/20201310')
                .set('x-access-token', token)
                .send()
                .end(function (err, res) {
                    expect(res).to.have.status(400);
                    expect(res.text).equal('Bad Request : Invalid Date Format');
				    done();
                });
        });

        it('Non-existing Manufacturer ID', function (done) {
            chai.request('https://localhost:8765/evcharge/api')
                .get('/report_consumption/Te8sla/20030101/20201010')
                .set('x-access-token', token)
                .send()
                .end(function (err, res) {
                    expect(res).to.have.status(402);
                    expect(res.text).equal('No charging stations found.');
				    done();
                });
        });

        it('Missing Parameter', function (done) {
            chai.request('https://localhost:8765/evcharge/api')
                .get('/report_consumption/20030101/20201010')
                .set('x-access-token', token)
                .send()
                .end(function (err, res) {
                    expect(res).to.have.status(404);
				    done();
                });
        });

        it('JSON format', function (done) {
            chai.request('https://localhost:8765/evcharge/api')
                .get('/report_consumption/Tesla/20200101/20201010?format=json')
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
                .get('/report_consumption/Tesla/20200101/20201010?format=csv')
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
                .get('/report_consumption/Tesla/20200101/20201010?format=wrong')
                .set('x-access-token', token)
                .send()
                .end(function (err, res) {
                    expect(res).to.have.status(400);
				    done();
                });
        });

        it('Have not logged in', function (done) {
            chai.request('https://localhost:8765/evcharge/api')
                .get('/report_consumption/Tesla/20200101/20201010')
                .set('x-access-token', ' ')
                .send()
                .end(function (err, res) {
                    expect(res).to.have.status(401);
				    done();
                });
        });
    });

    describe('Energy Cost Per Model', ()=>{

        it('Correct parameters - complete check', function (done) {
            chai.request('https://localhost:8765/evcharge/api')
                .get('/EnergyCost/PerModel/1/Model 3/20180101/20201010')
                .set('x-access-token', token)
                .send()
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.type).equal('application/json');
                    expect(res).to.be.an('object');
                    expect(res.body).to.be.an('array');
                    expect(res.body[0]).to.be.an('object');
                    expect(res.body[0]).to.have.property('ManufacturerID').equal(1);
                    expect(res.body[1]).to.be.an('object');
                    expect(res.body[1]).to.have.property('ManufacturerName').equal('Tesla');
                    expect(res.body[2]).to.be.an('object');
                    expect(res.body[2]).to.have.property('RequestTimestamp');
                    expect(res.body[3]).to.be.an('object');
                    expect(res.body[3]).to.have.property('PeriodFrom').equal('2018-01-01');
                    expect(res.body[4]).to.be.an('object');
                    expect(res.body[4]).to.have.property('PeriodTo').equal('2020-10-10');
                    expect(res.body[5]).to.be.an('object');
                    expect(res.body[5]).to.have.property('NumberOfCars').equal(3);
                    expect(res.body[6]).to.be.an('array');
                    expect(res.body[6]).to.have.length(3);
                    expect(res.body[6][0]).to.have.property('CarID').equal('93c82e06-1aa3-4c19-8f81-b9fac0c598c3');
                    expect(res.body[6][0]).to.have.property('Model').equal('Model 3');
                    expect(res.body[6][0]).to.have.property('EnergyCost').equal(0.033467);
                    expect(res.body[6][0]).to.have.property('TotalKm').equal(81726);
                    expect(res.body[6][0]).to.have.property('TotalEnergyConsumed').equal(2735.12);
				    expect(res.body[6][1]).to.have.property('CarID').equal('7de25a64-e9fa-484f-bf99-d02b02cfb17d');
                    expect(res.body[6][1]).to.have.property('Model').equal('Model 3');
                    expect(res.body[6][1]).to.have.property('EnergyCost').equal(0.032391);
                    expect(res.body[6][1]).to.have.property('TotalKm').equal(74131);
                    expect(res.body[6][1]).to.have.property('TotalEnergyConsumed').equal(2401.2);
				    expect(res.body[6][2]).to.have.property('CarID').equal('7dbad968-7058-4440-9c8f-8f483cdd973a');
                    expect(res.body[6][2]).to.have.property('Model').equal('Model 3');
                    expect(res.body[6][2]).to.have.property('EnergyCost').equal(0.028146);
                    expect(res.body[6][2]).to.have.property('TotalKm').equal(98077);
                    expect(res.body[6][2]).to.have.property('TotalEnergyConsumed').equal(2760.51);
                    done();
                });
        });

        it('Manufacturer invalid ID', function (done) {
            chai.request('https://localhost:8765/evcharge/api')
                .get('/EnergyCost/PerModel/2ab/Model 3/20180101/20201010')
                .set('x-access-token', token)
                .send()
                .end(function (err, res) {
                    expect(res).to.have.status(400);
                    expect(res.text).equal('Bad Request : Invalid Manufacturer ID');
				    done();
                });
        });

        it('Manufacturer non-existing ID', function (done) {
            chai.request('https://localhost:8765/evcharge/api')
                .get('/EnergyCost/PerModel/20000/Model 3/20180101/20201010')
                .set('x-access-token', token)
                .send()
                .end(function (err, res) {
                    expect(res).to.have.status(402);
                    expect(res.text).equal('No Charging Sessions for Cars of this model for this period.');
				    done();
                });
        });

        it('Model that this Manufacturer does not have', function (done) {
            chai.request('https://localhost:8765/evcharge/api')
                .get('/EnergyCost/PerModel/1/e-Golf/20180101/20201010')
                .set('x-access-token', token)
                .send()
                .end(function (err, res) {
                    expect(res).to.have.status(402);
                    expect(res.text).equal('No Charging Sessions for Cars of this model for this period.');
				    done();
                });
        });

        it('Not existing model', function (done) {
            chai.request('https://localhost:8765/evcharge/api')
                .get('/EnergyCost/PerModel/1/kat/20180101/20201010')
                .set('x-access-token', token)
                .send()
                .end(function (err, res) {
                    expect(res).to.have.status(402);
                    expect(res.text).equal('No Charging Sessions for Cars of this model for this period.');
				    done();
                });
        });

        it('Invalid Dates', function (done) {
            chai.request('https://localhost:8765/evcharge/api')
                .get('/EnergyCost/PerModel/1/kat/jkdjnfk/20201010')
                .set('x-access-token', token)
                .send()
                .end(function (err, res) {
                    expect(res).to.have.status(400);
				    done();
                });
        });

        it('Parameter Missing', function (done) {
            chai.request('https://localhost:8765/evcharge/api')
                .get('/EnergyCost/PerModel/1/kat/20201010')
                .set('x-access-token', token)
                .send()
                .end(function (err, res) {
                    expect(res).to.have.status(404);
				    done();
                });
        });

        it('JSON format', function (done) {
            chai.request('https://localhost:8765/evcharge/api')
                .get('/EnergyCost/PerModel/1/Model 3/20180101/20201010?format=json')
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
                .get('/EnergyCost/PerModel/1/Model 3/20180101/20201010?format=csv')
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
                .get('/EnergyCost/PerModel/1/Model 3/20180101/20201010?format=wrong')
                .set('x-access-token', token)
                .send()
                .end(function (err, res) {
                    expect(res).to.have.status(400);
				    done();
                });
        });

        it('Have not logged in', function (done) {
            chai.request('https://localhost:8765/evcharge/api')
                .get('/EnergyCost/PerModel/1/Model 3/20180101/20201010')
                .set('x-access-token', ' ')
                .send()
                .end(function (err, res) {
                    expect(res).to.have.status(401);
				    done();
                });
        });

    });

    describe('Energy Cost Total', ()=>{

        it('Correct parameters - complete check', function (done) {
            chai.request('https://localhost:8765/evcharge/api')
                .get('/EnergyCost/Total/20080101/20201010')
                .set('x-access-token', token)
                .send()
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.type).equal('application/json');
                    expect(res).to.be.an('object');
                    expect(res.body).to.be.an('array');
                    expect(res.body[0]).to.be.an('object');
                    expect(res.body[0]).to.have.property('RequestTimestamp')
                    expect(res.body[1]).to.be.an('object');
                    expect(res.body[1]).to.have.property('PeriodFrom').equal('2008-01-01');
                    expect(res.body[2]).to.be.an('object');
                    expect(res.body[2]).to.have.property('PeriodTo').equal('2020-10-10');
                    expect(res.body[3]).to.be.an('array');
                    expect(res.body[3]).to.have.length(32);
                    expect(res.body[3][0]).to.have.property('ManufacturerName').equal('Aiways');
                    expect(res.body[3][0]).to.have.property('EnergyCostPerKm').equal(0.000393);
                    expect(res.body[3][0]).to.have.property('EnergyDelivedInKWh').equal(1367.49);
                    expect(res.body[3][0]).to.have.property('TotalKm').equal(3478760);
                    done()
                });
        });

        it('Correct parameters - check', function (done) {
            chai.request('https://localhost:8765/evcharge/api')
                .get('/EnergyCost/Total/20000101/20211010')
                .set('x-access-token', token)
                .send()
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body[0]).to.have.property('RequestTimestamp')
                    expect(res.body[1]).to.have.property('PeriodFrom').equal('2000-01-01');
                    expect(res.body[2]).to.have.property('PeriodTo').equal('2021-10-10');
                    expect(res.body[3]).to.be.an('array');
                    expect(res.body[3]).to.have.length(32);
                    done()
                });
        });


        it('Invalid Dates', function (done) {
            chai.request('https://localhost:8765/evcharge/api')
                .get('/EnergyCost/Total/2008-01-01/20031010')
                .set('x-access-token', token)
                .send()
                .end(function (err, res) {
                    expect(res).to.have.status(400);
				    done();
                });
        });

        it('Parameter Missing', function (done) {
            chai.request('https://localhost:8765/evcharge/api')
                .get('/EnergyCost/Total/20080101')
                .set('x-access-token', token)
                .send()
                .end(function (err, res) {
                    expect(res).to.have.status(404);
				    done();
                });
        });

        it('JSON format', function (done) {
            chai.request('https://localhost:8765/evcharge/api')
                .get('/EnergyCost/Total/20080101/20201010?format=json')
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
                .get('/EnergyCost/Total/20080101/20201010?format=csv')
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
                .get('/EnergyCost/Total/20080101/20201010?format=wrong')
                .set('x-access-token', token)
                .send()
                .end(function (err, res) {
                    expect(res).to.have.status(400);
				    done();
                });
        });

        it('Have not logged in', function (done) {
            chai.request('https://localhost:8765/evcharge/api')
                .get('/EnergyCost/Total/20080101/20201010')
                .set('x-access-token', ' ')
                .send()
                .end(function (err, res) {
                    expect(res).to.have.status(401);
				    done();
                });
        });


    });

    describe('Energy Cost - Get Models', ()=>{

        it('Correct parameters - complete check', function (done) {
            chai.request('https://localhost:8765/evcharge/api')
                .get('/EnergyCost/GetModels/1')
                .set('x-access-token', token)
                .send()
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.type).equal('application/json');
                    expect(res).to.be.an('object');
                    expect(res.body).to.be.an('array');
                    expect(res.body).to.have.length(3);
                    expect(res.body[0]).to.be.an('object');
                    expect(res.body[0]).to.have.property('Model').equal('Model S')
                    expect(res.body[1]).to.be.an('object');
                    expect(res.body[1]).to.have.property('Model').equal('Model X');
                    expect(res.body[2]).to.be.an('object');
                    expect(res.body[2]).to.have.property('Model').equal('Model 3');
                    done();
                });
        });

        it('Correct parameters - complete check 2', function (done) {
            chai.request('https://localhost:8765/evcharge/api')
                .get('/EnergyCost/GetModels/2')
                .set('x-access-token', token)
                .send()
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.type).equal('application/json');
                    expect(res).to.be.an('object');
                    expect(res.body).to.be.an('array');
                    expect(res.body).to.have.length(2);
                    expect(res.body[0]).to.be.an('object');
                    expect(res.body[0]).to.have.property('Model').equal('Countryman ALL4')
                    expect(res.body[1]).to.be.an('object');
                    expect(res.body[1]).to.have.property('Model').equal('Cooper SE');
                    done();
                });
        });

        it('Invalid Manufacturer ID', function (done) {
            chai.request('https://localhost:8765/evcharge/api')
                .get('/EnergyCost/GetModels/kat')
                .set('x-access-token', token)
                .send()
                .end(function (err, res) {
                    expect(res).to.have.status(400);
				    done();
                });
        });

        it('Non existing Manufacturer ID', function (done) {
            chai.request('https://localhost:8765/evcharge/api')
                .get('/EnergyCost/GetModels/10000')
                .set('x-access-token', token)
                .send()
                .end(function (err, res) {
                    expect(res).to.have.status(402);
				    done();
                });
        });


        it('Parameter Missing', function (done) {
            chai.request('https://localhost:8765/evcharge/api')
                .get('/EnergyCost/GetModels')
                .set('x-access-token', token)
                .send()
                .end(function (err, res) {
                    expect(res).to.have.status(404);
				    done();
                });
        });

        it('JSON format', function (done) {
            chai.request('https://localhost:8765/evcharge/api')
                .get('/EnergyCost/GetModels/1?format=json')
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
                .get('/EnergyCost/GetModels/1?format=csv')
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
                .get('/EnergyCost/GetModels/1?format=wrong')
                .set('x-access-token', token)
                .send()
                .end(function (err, res) {
                    expect(res).to.have.status(400);
				    done();
                });
        });

        it('Have not logged in', function (done) {
            chai.request('https://localhost:8765/evcharge/api')
                .get('/EnergyCost/GetModels/1')
                .set('x-access-token', ' ')
                .send()
                .end(function (err, res) {
                    expect(res).to.have.status(401);
				    done();
                });
        });
    });

});

describe('Use Case : Statistics Manufacturer', ()=> {
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
