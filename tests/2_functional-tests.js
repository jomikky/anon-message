/*
*
*
*       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]-----
*       (if additional are added, keep them at the very end!)
*/
var expect = require('chai').expect;
var chaiHttp = require('chai-http');
var chai = require('chai');
var assert = chai.assert;
var server = require('../server');
var idtest;
var idtest1;
chai.use(chaiHttp);

suite('Functional Tests', function() {

  suite('API ROUTING FOR /api/threads/:board', function() {
    
    suite('POST', function() {
      test('Threads/post', function(done) {
      chai.request(server)
      .post('/api/threads/123456')
      .type('form')
      .send({
        'text': 'text1',
        'delete_password': '1234', k:1
      }
      ).end(function(err, res){
         if(err) console.log( err);
           assert.equal(res.status, 200);            
           expect(res).to.redirect;
           done()
        });
      });
    });
    
    suite('GET', function() {
      test('Threads/get', function(done) {
      chai.request(server)
      .get('/api/threads/123456')
      // .query({text: 'text1', delete_password: '1234'})
      .end(function(err, res){
        if(err) console.log( err);
        assert.equal(res.status, 200);
        //console.log( res.body);
        var l= res.body.length-1
        assert.property(res.body[l], 'text', 'Body in array should contain text');
        assert.equal(res.body[l].text,'text1');
        assert.notProperty(res.body[l], 'delete_password', 'The delete_passwords fields will not be sent');
        assert.notProperty(res.body[l], 'reported', 'The reported fields will not be sent');
        idtest=res.body[l]._id
        idtest1=res.body[0]._id
        done()
      });
      });        
    });
    
    suite('DELETE', function() {
      test('Threads/del', function(done) { //console.log( idtest);
      chai.request(server)
      .del('/api/threads/123456')
      .send({thread_id:idtest ,delete_password: '1234'})
      .end(function(err, res){
        if(err)   console.log( err);
        assert.equal(res.status, 200);
        assert.equal(res.text,'success');
        done()
        });
      });      
    });
    
    suite('PUT', function() {
      test('Threads/put', function(done) {//console.log( idtest);
      chai.request(server)
      .put('/api/threads/123456')
      .send({thread_id:idtest1 })
      .end(function(err, res){
        if(err)   console.log( err);
        assert.equal(res.status, 200);
        assert.equal(res.text,'success');
        done()
       });
      });      
    });
    
  });
  
  suite('API ROUTING FOR /api/replies/:board', function() {
    
    suite('POST', function() {
      test('replies/post', function(done) {
      chai.request(server)
      .post('/api/replies/123456')
      //.type('form')
      .send({
        'text': 'text1',
        'delete_password': '1234', thread_id:idtest1
      }    
      ).end(function(err, res){
        if(err)   console.log( err);
          assert.equal(res.status, 200);              
          expect(res).to.redirect;
          done()
        });
      });      
    });
    
    suite('GET', function() {
      test('replies/get', function(done) {
      chai.request(server)
      .get('/api/replies/123456/')
      .query({thread_id: idtest1})
      .end(function(err, res){
        assert.equal(res.status, 200);
        var l= res.body.replies.length-1
        assert.property(res.body.replies[l], 'text', 'Body in array should contain text');
        assert.equal(res.body.replies[l].text,'text1');
        assert.notProperty(res.body.replies[l], 'delete_password', 'The delete_passwords fields will not be sent');
        assert.notProperty(res.body.replies[l], 'reported', 'The reported fields will not be sent');
        idtest=res.body.replies[0]._id
        idtest1=res.body._id
        // console.log(idtest+''+idtest1)
        done()
      });
      });
    });
    
    suite('PUT', function() {
      test('replies/put', function(done) {
      chai.request(server)
      .put('/api/replies/123456/')
      .query({thread_id: idtest1, reply_id: idtest})   
      .end(function(err, res){
        if(err)   console.log( err);
        assert.equal(res.status, 200);
        assert.equal(res.text,'success');
        done()
      });
      });
    });
    
    suite('DELETE', function() {
      test('replies/del', function(done) { //console.log( idtest);
      chai.request(server)
      .del('/api/replies/123456')
      .send({thread_id:idtest1 ,reply_id: idtest,delete_password: '1234'})
      .end(function(err, res){
        if(err)   console.log( err);
        assert.equal(res.status, 200);
        assert.equal(res.text,'success');
        done()
      });
      });
    });
    
  });

});
