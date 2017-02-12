function onEveryMinutes(){
  setCalLab();
}


function parse_and_set(cal, str){
  var res = str.match(/\d+/g);
  var d1 = new Date();
  var yy = d1.getFullYear();
  var dd = new Date(yy,res[0]-1,res[1], res[2], res[3]);
  var ed = new Date(dd.getTime());
  var ed_m = dd.getMinutes();
  ed.setMinutes(ed_m+25)
  
  var event = cal.createEvent(str,dd,ed);
  Logger.log('Event ID: ' + event.getId());
}



function setCalLab(){
  var calName = "也哉"; //your calendar name of google calendar
  
  
  var thds = GmailApp.getInboxThreads();
  var thds = GmailApp.search('label:cclesson is:starred');
  var cals = CalendarApp.getCalendarsByName(calName);
  
  for(var n in thds){
    var thd = thds[n];
    var msgs = thd.getMessages();
    
    for (var y=0; y < msgs.length; y++) {
      var msg = msgs[y];
      var subject = msg.getSubject();
      var star = msg.isStarred()
      if (star && subject.indexOf("[BOOKING] JP time ",0) != -1){
        //label.addToThread(thd);
        //for(var m in msgs){
        var body = msg.getPlainBody();
        var str = msg.getSubject();
        var res = str.match(/\d+/g);
        cal = cals[0];
        parse_and_set(cal, str);
        msg.unstar();
      }
    }
  }
}

//=================================================================test code======================================
function test(){
  var thds = GmailApp.getInboxThreads();
  var calName = "也哉";
  var cals = CalendarApp.getCalendarsByName(calName);
  var cal = cals[0];
  var dstr = "[BOOKING] JP time 2/12(Sun.) 22:00~ (Nariya & エイコ)";
  parse_and_set(cal, dstr);

}
//=================================================================test code======================================
