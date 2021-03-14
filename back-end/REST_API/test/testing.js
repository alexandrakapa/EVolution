process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const chai = require('chai');
const chaiHttp = require('chai-http');

const {expect} = chai;

chai.use(chaiHttp);

let token = String();

describe('Displaying station information', () => {

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





	describe('Display all stations', () => {

		it('Should return all available stations', function(done) {
			chai.request('https://localhost:8765/evcharge/api')
			.get('/stationInfo/allStations?format=json')
			.set('x-access-token',token)
			.send()
			.end( function(err,res) {
				expect(res).to.have.status(200);
				expect(res).to.be.an('object');
				done();
			});
		});

		it('Should return error code if not authorised', function(done) {
			chai.request('https://localhost:8765/evcharge/api')
			.get('/stationInfo/allStations')
			.set('x-access-token', '')
			.send()
			.end( function(err,res) {
				expect(res).to.have.status(401);
				done();
			});
		});

	describe('Show specific station info', function(done) {

		it('Should return station info', function(done) {
			chai.request('https://localhost:8765/evcharge/api')
			.get('/stationInfo/2-39-123-23')
			.set('x-access-token',token)
			.send()
			.end( function(err,res) {
				expect(res).to.have.status(200);
				expect(res).to.be.an('object');
				expect(res.body[0]).to.be.an('object');
				expect(res.body[0]).to.have.property('operator').equal('Marilou Depuy');
				expect(res.body[0]).to.have.property('euro_per_kWh').equal(0.14);
				done();
			});
		});

		/*it('Should return station error code if stationID does not exist', function(done) {
			chai.request('https://localhost:8765/evcharge/api')
			.get('/stationInfo/2-39-123-34')
			.set('x-access-token',token)
			.send()
			.end( function(err,res) {
				expect(res).to.have.status(402);
				done();
			});
		});*/

		it('Should return error code if not authorised', function(done) {
			chai.request('https://localhost:8765/evcharge/api')
			.get('/stationInfo/2-39-123-23')
			.set('x-access-token', '')
			.send()
			.end( function(err,res) {
				expect(res).to.have.status(401);
				done();
			});
		});
	});



	});


});


describe('Vehicles', () => {
	describe( 'SessionsPerEV', () => {
		it('Should return sessions for requested EV', function(done)  {
			chai.request('https://localhost:8765/evcharge/api')
			.get('/SessionsPerEV/059c028d-b2a6-4a8d-947a-158c7537b290/20180504/20180509')
			.set('x-access-token', token)
			.send()
			.end( function(err,res) {
				expect(res).to.have.status(200);
				expect(res).to.be.an('object');
				expect(res.body).to.be.an('array');
				expect(res.body[0]).to.be.an('object');
				expect(res.body[0]).to.have.property('Vehicle').equal('059c028d-b2a6-4a8d-947a-158c7537b290');
				expect(res.body[1]).to.have.property('TotalEnergyConsumed').equal(11.61);
				expect(res.body[2]).to.have.property('NumberOfVisitedPoints').equal(1);
				expect(res.body[3]).to.have.property('NumberOfVehicleChargingSessions').equal(1);
				expect(res.body[4]).to.be.an('object');
				expect(res.body[5]).to.have.property('PeriodFrom').equal('2018-05-04');
				expect(res.body[6]).to.have.property('PeriodTo').equal('2018-05-09');
				expect(res.body[7]).to.be.a('array');
				expect(res.body[7][0]).to.have.property('NumberofChargingSessions').equal(1);
				expect(res.body[7][1]).to.have.property('SessionIndex').equal(1);
				expect(res.body[7][1]).to.have.property('SessionID').equal('5bc91740f9af8b0dc677b834');
				expect(res.body[7][1]).to.have.property('EnergyProvider').equal('Fenie Energía (Spain)');
				expect(res.body[7][1]).to.have.property('StartedOn').equal('2018-05-04 11:46:40');
				expect(res.body[7][1]).to.have.property('FinishedOn').equal('2018-05-04 21:27:20');
				expect(res.body[7][1]).to.have.property('EnergyDelivered').equal(11.61);
				expect(res.body[7][1]).to.have.property('CostPerkWh').equal(0.15);
				expect(res.body[7][1]).to.have.property('SessionCost').equal(2.15);

				done();
			});
		});

		it('Should return error code if date order is wrong', function(done) {
			chai.request('https://localhost:8765/evcharge/api')
			.get('/SessionsPerEV/059c028d-b2a6-4a8d-947a-158c7537b290/20190504/20180509')
			.set('x-access-token', token)
			.send()
			.end(function(err,res) {
				expect(res).to.have.status(400);
				done();
			});
		});

		it('Should return error code if vehicle ID does not exist', function(done) {
			chai.request('https://localhost:8765/evcharge/api')
			.get('/SessionsPerEV/059c028d-b2a6-4a8d-947a-158clkjhg290/20190504/20180509')
			.set('x-access-token', token)
			.send()
			.end(function(err,res) {
				expect(res).to.have.status(400);
				done();
			});
		});

		it('Should return error code if user is not authorised', function(done) {
			chai.request('https://localhost:8765/evcharge/api')
			.get('/SessionsPerEV/059c028d-b2a6-4a8d-947a-158c7537b290/20190504/20180509')
			.set('x-access-token', '')
			.send()
			.end(function(err,res) {
				expect(res).to.have.status(401);
				done();
			});
		});


	});
});

describe('Points', () => {
	describe( 'SessionsPerPoint', () => {
		it('Should return sessions for requested point', function(done)  {
			chai.request('https://localhost:8765/evcharge/api')
			.get('/SessionsPerPoint/CA-3132-39-123-23/20180501/20180502')
			.set('x-access-token', token)
			.send()
			.end( function(err,res) {
				expect(res).to.have.status(200);
				expect(res).to.be.an('object');
				expect(res.body).to.be.an('array');
				expect(res.body[0]).to.be.an('object');
				expect(res.body[0]).to.have.property('Point').equal('CA-313-2-39-123-23');
				expect(res.body[1]).to.have.property('PointOperator').equal('Matthew Lamay');
				expect(res.body[2]).to.be.an('object');
				expect(res.body[3]).to.have.property('PeriodFrom').equal('2018-05-01');
				expect(res.body[4]).to.have.property('PeriodTo').equal('2018-05-02');
				expect(res.body[5]).to.have.property('NumberOfChargingSessions').equal(1);
				expect(res.body[6]).to.be.a('array');
				expect(res.body[6][0]).to.have.property('SessionIndex').equal(1);
				expect(res.body[6][0]).to.have.property('SessionID').equal('5bc9160af9af8b0dad3c06b4');
				expect(res.body[6][0]).to.have.property('StartedOn').equal('2018-05-01 20:12:26');
				expect(res.body[6][0]).to.have.property('FinishedOn').equal('2018-05-01 23:56:31');
				expect(res.body[6][0]).to.have.property('Protocol').equal('PWM');
				expect(res.body[6][0]).to.have.property('EnergyDelivered').equal(6.49);
				expect(res.body[6][0]).to.have.property('Payment').equal('Pay later with app.');
				expect(res.body[6][0]).to.have.property('VehicleType').equal('Life 20');

				done();
			});
		});

		it('Should return error code if date order is wrong', function(done) {
			chai.request('https://localhost:8765/evcharge/api')
			.get('/SessionsPerPoint/AA-1602-39-129-17/20190501/20180502')
			.set('x-access-token', token)
			.send()
			.end(function(err,res) {
				expect(res).to.have.status(400);
				done();
			});
		});

		it('Should return error code if point ID does not exist', function(done) {
			chai.request('https://localhost:8765/evcharge/api')
			.get('/SessionsPerPoint/AA-1619-39-129-17/20180501/20180502')
			.set('x-access-token', token)
			.send()
			.end(function(err,res) {
				expect(res).to.have.status(402);
				done();
			});
		});

		it('Should return error code if user is not authorised', function(done) {
			chai.request('https://localhost:8765/evcharge/api')
			.get('/SessionsPerPoint/AA-1602-39-129-17/20180501/20180502')
			.set('x-access-token', '')
			.send()
			.end(function(err,res) {
				expect(res).to.have.status(401);
				done();
			});
		});


		describe('Missing parameters', () => {
			it('Should return error code if user does not provide with an ev', function(done) {
				chai.request('https://localhost:8765/evcharge/api')
				.get('/SessionsPerPoint/20190504/20180509')
				.set('x-access-token', token)
				.send()
				.end(function(err,res) {
					expect(res).to.have.status(404);
					done();
				});
			});

			it('Should return error code if user does not provide period from', function(done) {
				chai.request('https://localhost:8765/evcharge/api')
				.get('/SessionsPerPoint/AA-1602-39-129-17/20180502')
				.set('x-access-token', token)
				.send()
				.end(function(err,res) {
					expect(res).to.have.status(404);
					done();
				});
			});

			it('Should return error code if user does nor provide with period to', function(done) {
				chai.request('https://localhost:8765/evcharge/api')
				.get('/SessionsPerPoint/AA-1602-39-129-17/20180501')
				.set('x-access-token', token)
				.send()
				.end(function(err,res) {
					expect(res).to.have.status(404);
					done();
				});
			});

		});

		describe('Wrong date', () => {
			it('Should return error code if month is invalid', function(done) {
				chai.request('https://localhost:8765/evcharge/api')
				.get('/SessionsPerPoint/AA-1602-39-129-17/20180501/20181502')
				.set('x-access-token', token)
				.send()
				.end(function(err,res) {
					expect(res).to.have.status(400);
					done();
				});
			});

			it('Should return error code if day is invalid', function(done) {
				chai.request('https://localhost:8765/evcharge/api')
				.get('/SessionsPerPoint/AA-1602-39-129-17/20180231/20180502')
				.set('x-access-token', token)
				.send()
				.end(function(err,res) {
					expect(res).to.have.status(400);
					done();
				});
			});

			it('Should return error code if date format is wrong, eg yyyy-mm-dd', function(done) {
				chai.request('https://localhost:8765/evcharge/api')
				.get('/SessionsPerPoint/AA-1602-39-129-17/2018-05-01/2018-05-02')
				.set('x-access-token', token)
				.send()
				.end(function(err,res) {
					expect(res).to.have.status(400);
					done();
				});
			});

		});

	});
});


describe('Providers', () => {
	describe( 'SessionsPerProvider', () => {
		it('Should return sessions for requested provider', function(done)  {
			chai.request('https://localhost:8765/evcharge/api')
			.get('/SessionsPerProvider/2/20180426/20180426')
			.set('x-access-token', token)
			.send()
			.end( function(err,res) {
				expect(res).to.have.status(200);
				expect(res).to.be.an('object');
				expect(res.body).to.be.an('array');
				expect(res.body[0]).to.be.an('object');
				expect(res.body[0]).to.have.property('ProviderID').equal(2);
				expect(res.body[1]).to.have.property('ProviderName').equal('BS Energie');
				expect(res.body[2]).to.be.a('array');
				expect(res.body[2][0]).to.have.property('StationID').equal('2-39-79-378');
				expect(res.body[2][0]).to.have.property('SessionID').equal('5bc90cb9f9af8b0d7fe77d0b');
				expect(res.body[2][0]).to.have.property('VehicleID').equal('5335d545-cfeb-4bca-bb11-cf0966f1b5ca');
				expect(res.body[2][0]).to.have.property('StartedOn').equal('2018-04-26 03:13:44');
				expect(res.body[2][0]).to.have.property('FinishedOn').equal('2018-04-26 16:47:48');
				expect(res.body[2][0]).to.have.property('EnergyDelivered').equal(6.5);
				expect(res.body[2][0]).to.have.property('CostPerKWh').equal(2.12);
				expect(res.body[2][0]).to.have.property('TotalCost').equal(13.78);

				done();
			});
		});

		it('Should return error code if date order is wrong', function(done) {
			chai.request('https://localhost:8765/evcharge/api')
			.get('/SessionsPerProvider/1/20190504/20180505')
			.set('x-access-token', token)
			.send()
			.end(function(err,res) {
				expect(res).to.have.status(400);
				done();
			});
		});

		it('Should return error code if providerID does not exist', function(done) {
			chai.request('https://localhost:8765/evcharge/api')
			.get('/SessionsPerProvider/notanumber/20180504/20180505')
			.set('x-access-token', token)
			.send()
			.end(function(err,res) {
				expect(res).to.have.status(402);
				done();
			});
		});

		it('Should return error code if user is not authorised', function(done) {
			chai.request('https://localhost:8765/evcharge/api')
			.get('/SessionsPerProvider/1/20180504/20180505')
			.set('x-access-token', '')
			.send()
			.end(function(err,res) {
				expect(res).to.have.status(401);
				done();
			});
		});


		describe('Missing parameters', () => {
			it('Should return error code if user does not provide with a provider', function(done) {
				chai.request('https://localhost:8765/evcharge/api')
				.get('/SessionsPerProvider/20180504/20180505')
				.set('x-access-token', token)
				.send()
				.end(function(err,res) {
					expect(res).to.have.status(404);
					done();
				});
			});

			it('Should return error code if user does not provide period from', function(done) {
				chai.request('https://localhost:8765/evcharge/api')
				.get('/SessionsPerProvider/1/20180505')
				.set('x-access-token', token)
				.send()
				.end(function(err,res) {
					expect(res).to.have.status(404);
					done();
				});
			});

			it('Should return error code if user does nor provide with period to', function(done) {
				chai.request('https://localhost:8765/evcharge/api')
				.get('/SessionsPerProvider/1/20180505')
				.set('x-access-token', token)
				.send()
				.end(function(err,res) {
					expect(res).to.have.status(404);
					done();
				});
			});

		});

		describe('Wrong date', () => {
			it('Should return error code if month is invalid', function(done) {
				chai.request('https://localhost:8765/evcharge/api')
				.get('/SessionsPerProvider/1/20180004/20180505')
				.set('x-access-token', token)
				.send()
				.end(function(err,res) {
					expect(res).to.have.status(400);
					done();
				});
			});

			it('Should return error code if day is invalid', function(done) {
				chai.request('https://localhost:8765/evcharge/api')
				.get('/SessionsPerProvider/1/20180431/20180505')
				.set('x-access-token', token)
				.send()
				.end(function(err,res) {
					expect(res).to.have.status(400);
					done();
				});
			});

			it('Should return error code if date format is wrong, eg yyyyddmm', function(done) {
				chai.request('https://localhost:8765/evcharge/api')
				.get('/SessionsPerProvider/1/20183103/20180404')
				.set('x-access-token', token)
				.send()
				.end(function(err,res) {
					expect(res).to.have.status(400);
					done();
				});
			});

		});

	});
});


describe('Station', () => {
	describe( 'SessionsPerStation', () => {
		it('Should return sessions for requested station', function(done)  {
			chai.request('https://localhost:8765/evcharge/api')
			.get('/SessionsPerStation/2-39-123-23/20180503/20180503')
			.set('x-access-token', token)
			.send()
			.end( function(err,res) {
				expect(res).to.have.status(200);
				expect(res).to.be.an('object');
				expect(res.body).to.be.an('array');
				expect(res.body[0]).to.be.an('object');
				expect(res.body[0]).to.have.property('StationID').equal('2-39-123-23');
				expect(res.body[1]).to.have.property('Operator').equal('Marilou Depuy');
				expect(res.body[2]).to.be.an('object');
				expect(res.body[3]).to.have.property('PeriodFrom').equal('2018-05-03');
				expect(res.body[4]).to.have.property('PeriodTo').equal('2018-05-03');
				expect(res.body[5]).to.have.property('TotalEnergyDelivered').equal(4.26);
				expect(res.body[6]).to.have.property('NumberOfChargingSessions').equal(1);
				expect(res.body[7]).to.be.a('array');
				expect(res.body[7][0]).to.have.property('NumberOfActivePoints').equal(1);
				expect(res.body[7][1]).to.have.property('PointID').equal('2-39-123-23 CB-772');
				expect(res.body[7][1]).to.have.property('PointSessions').equal(1);
				expect(res.body[7][1]).to.have.property('EnergyDelivered').equal(4.26);
				done();
			});
		});

		it('Should return error code if date order is wrong', function(done) {
			chai.request('https://localhost:8765/evcharge/api')
			.get('/SessionsPerStation/2-39-123-23/20190501/20180503')
			.set('x-access-token', token)
			.send()
			.end(function(err,res) {
				expect(res).to.have.status(400);
				done();
			});
		});

		it('Should return error code if station ID does not exist', function(done) {
			chai.request('https://localhost:8765/evcharge/api')
			.get('/SessionsPerStation/2-39-123-34/20180501/20180503')
			.set('x-access-token', token)
			.send()
			.end(function(err,res) {
				expect(res).to.have.status(402);
				done();
			});
		});

		it('Should return error code if user is not authorised', function(done) {
			chai.request('https://localhost:8765/evcharge/api')
			.get('/SessionsPerStation/2-39-123-23/20180501/20180503')
			.set('x-access-token', '')
			.send()
			.end(function(err,res) {
				expect(res).to.have.status(401);
				done();
			});
		});


		describe('Missing parameters', () => {
			it('Should return error code if user does not provide with a station', function(done) {
				chai.request('https://localhost:8765/evcharge/api')
				.get('/SessionsPerStation/20180501/20180503')
				.set('x-access-token', token)
				.send()
				.end(function(err,res) {
					expect(res).to.have.status(404);
					done();
				});
			});

			it('Should return error code if user does not provide period from', function(done) {
				chai.request('https://localhost:8765/evcharge/api')
				.get('/SessionsPerEV/059c028d-b2a6-4a8d-947a-158c7537b290/20180509')
				.set('x-access-token', token)
				.send()
				.end(function(err,res) {
					expect(res).to.have.status(404);
					done();
				});
			});

			it('Should return error code if user does nor provide with period to', function(done) {
				chai.request('https://localhost:8765/evcharge/api')
				.get('/SessionsPerEV/059c028d-b2a6-4a8d-947a-158c7537b290/20180509')
				.set('x-access-token', token)
				.send()
				.end(function(err,res) {
					expect(res).to.have.status(404);
					done();
				});
			});

		});

		describe('Wrong date', () => {
			it('Should return error code if month is invalid', function(done) {
				chai.request('https://localhost:8765/evcharge/api')
				.get('/SessionsPerEV/059c028d-b2a6-4a8d-947a-158c7537b290/20191404/20180509')
				.set('x-access-token', token)
				.send()
				.end(function(err,res) {
					expect(res).to.have.status(400);
					done();
				});
			});

			it('Should return error code if day is invalid', function(done) {
				chai.request('https://localhost:8765/evcharge/api')
				.get('/SessionsPerEV/059c028d-b2a6-4a8d-947a-158c7537b290/20180509/20180532')
				.set('x-access-token', token)
				.send()
				.end(function(err,res) {
					expect(res).to.have.status(400);
					done();
				});
			});

			it('Should return error code if date format is wrong, eg ddmmyyyy', function(done) {
				chai.request('https://localhost:8765/evcharge/api')
				.get('/SessionsPerEV/059c028d-b2a6-4a8d-947a-158c7537b290/01012018/20180509')
				.set('x-access-token', token)
				.send()
				.end(function(err,res) {
					expect(res).to.have.status(400);
					done();
				});
			});

		});

	});
});



describe('Testing Endpoints', ()=> {
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
