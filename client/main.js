import { Template } from 'meteor/templating';
import { Times } from '../imports/api/times.js';
import './main.html';

var sec = document.querySelector('.secs');
var min = document.querySelector('.mins');
var hours = document.querySelector('.hours');
var flag = false;


function getTime() {
  var currentDate = new Date;
  timer = new Date (currentDate - initialDate);
  seconds = timer.getSeconds();
  minutes = timer.getMinutes();
  hours = timer.getUTCHours();

  if(seconds < 10){
    seconds = '0' + seconds;
  }
  if (minutes < 10){
    minutes = '0' + minutes;
  }
  if (hours < 10){
    hours = '0' + hours;
  }
}

function stopTimer() {
  clearInterval(timerId);
  getTime();
  flag = true;
}
function startStopwatch() {
   if(!flag) initialDate = new Date;
}
function displayStopButton () {
  document.getElementsByClassName("start").value="Stop";
}
function displayTimer() {
    timerId = setInterval(counter, 10);
  }
  function counter() {
      getTime();
      document.querySelector('.secs').innerHTML = seconds;
      document.querySelector('.mins').innerHTML = minutes;
      document.querySelector('.hours').innerHTML = hours;
    }
  
Template.hello.onCreated(function helloOnCreated() {
  
});

Template.hello.helpers({

});

Template.hello.events({

  'click .start': function (e) {
    e.preventDefault();
    console.log('start');
    displayStopButton();
    startStopwatch();
    displayTimer();
  },
  'click .stop': function (e) {
    e.preventDefault();
    stopTimer()
  },
  'click .checking': function (e) {
    e.preventDefault();
    console.log('checking',document.getElementsByClassName("proposalTimeH"))
    document.querySelector('.pHours').innerHTML = document.getElementsByClassName("proposalTimeH")[0].value
    document.querySelector('.pMinute').innerHTML = document.getElementsByClassName("proposalTimeM")[0].value
  },
  'click .save': function (e) {
    e.preventDefault();
    var item = {
      userEmail: Meteor.user().emails[0].address,
      spentH: +document.getElementsByClassName("timeHouts")[0].value,
      spentM: +document.getElementsByClassName("timeMinute")[0].value,
      data: new Date()
    };
    Times.insert(item);
    console.log('tmes',Times.find().fetch());
  },
  'click .showTime': function (e) {
    e.preventDefault();
    var times = Times.find().fetch();
    var hrs = 0;
    var min = 0;
    for (var i = 0; i < times.length; i++) {
      if (Meteor.user().emails[0].address === times[i].userEmail) {
        hrs = hrs+ times[i].spentH;
        min = min+ times[i].spentM;
      }
    }
    if (min>59) {
      var th = Math.trunc(min/60);
      hrs = hrs+ th;
      min=min-th*60
    }
    document.querySelector('.allSpendetTime').innerHTML='Hours'+hrs+'  '+'Minute'+min;
  },

});
