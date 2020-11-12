$(window).load(function() {
  
  $("#miniMap0").hover(function() {

    document.getElementById("map").style.opacity=0.2;
    document.getElementById("sprite1").style.opacity=0.2;
    document.getElementById("sprite2").style.opacity=0.2;
    document.getElementById("sprite3").style.opacity=0.2;
    
  });
  
  $("#miniMap0").mouseleave(function() {
  
    document.getElementById("map").style.opacity=1;
    document.getElementById("sprite1").style.opacity=1;
    document.getElementById("sprite2").style.opacity=1;
    document.getElementById("sprite3").style.opacity=1;

  });
  
  $("#miniMap1").hover(function() {

    document.getElementById("map").style.opacity=0.2;
    document.getElementById("sprite0").style.opacity=0.2;
    document.getElementById("sprite2").style.opacity=0.2;
    document.getElementById("sprite3").style.opacity=0.2;
    
  });
  
  $("#miniMap1").mouseleave(function() {
  
    document.getElementById("map").style.opacity=1;
    document.getElementById("sprite0").style.opacity=1;
    document.getElementById("sprite2").style.opacity=1;
    document.getElementById("sprite3").style.opacity=1;

  });

    $("#miniMap2").hover(function() {

    document.getElementById("map").style.opacity=0.2;
    document.getElementById("sprite1").style.opacity=0.2;
    document.getElementById("sprite0").style.opacity=0.2;
    document.getElementById("sprite3").style.opacity=0.2;
    
  });
  
  $("#miniMap2").mouseleave(function() {
  
    document.getElementById("map").style.opacity=1;
    document.getElementById("sprite1").style.opacity=1;
    document.getElementById("sprite0").style.opacity=1;
    document.getElementById("sprite3").style.opacity=1;

  });

    $("#miniMap3").hover(function() {

    document.getElementById("map").style.opacity=0.2;
    document.getElementById("sprite1").style.opacity=0.2;
    document.getElementById("sprite2").style.opacity=0.2;
    document.getElementById("sprite0").style.opacity=0.2;
    
  });
  
  $("#miniMap3").mouseleave(function() {
  
    document.getElementById("map").style.opacity=1;
    document.getElementById("sprite1").style.opacity=1;
    document.getElementById("sprite2").style.opacity=1;
    document.getElementById("sprite0").style.opacity=1;

  });

});