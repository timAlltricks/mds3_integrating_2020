const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../index')
const should = chai.should()
const expect = chai.expect

chai.use(chaiHttp)

// ---> DEBUT
/**
  * Génération des nouvelles couleurs et enregistrement de ces
  * couleurs dans un tableau.
  */
const newValues = []
const colorKey = 'NEW_COLOR_'
let nextCursor = 0;
const payloadColor = () => {
  const nextColor = `${colorKey}${nextCursor}`
  newValues.push(nextColor)
  nextCursor++;
  return { 'color': nextColor }
}
const getCurrentColor = () => {
  return nextCursor > 0 ? `${colorKey}${nextCursor - 1}` : `${colorKey}O`
}
// <-- FIN


// GET all colors
describe('GET REQUEST RETURN A STATUS 200 OK', function() {
  it('Response should be 200 OK on a GET REQUEST', function(done) {   
      chai.request('http://localhost:8080/colors')
      .get('/')
      .end(function(err, res) {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).to.be.an('object');
          expect(res.body.results).to.be.an('array');
          expect(res.body.results).to.include.members(["RED", "GREEN", "BLUE"]);
          done();
      });
  });
});

// GET with bad route
describe('GET REQUEST RETURN A STATUS 404 error', function() {
  it('Response should be 404 error on a GET REQUEST', function(done) {   
      chai.request('http://localhost:8080/cococo')
      .get('/')
      .end(function(err, res) {
          expect(res).to.have.status(404);
          done();
      });
  });
});

// POST color
describe('POST REQUEST RETURN A STATUS 201 OK', function() {
  it('Response should be 201 OK on a POST REQUEST', function(done) {   
      chai.request('http://localhost:8080/colors')
      .post('/')
      .set('content-type', 'application/json')
      .send(payloadColor())
      .end(function(err, res) {
          expect(res).to.have.status(201);
          expect(res).to.be.json;
          expect(res.body).to.be.an('object');
          console.log(res.body.results);
          expect(res.body.results).to.be.an('array');
          expect(res.body.results).to.include.members(getCurrentColor());
          done();
      });
  });
});

// GET all colors
describe('GET REQUEST RETURN A STATUS 200 OK', function() {
  it('Response should be 200 OK on a GET REQUEST', function(done) {   
      chai.request('http://localhost:8080/colors')
      .get('/')
      .end(function(err, res) {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).to.be.an('object');
          expect(res.body.results).to.be.an('array');
          expect(res.body.results).to.include.members(["RED", "GREEN", "BLUE", getCurrentColor()]);
          done();
      });
  });
});