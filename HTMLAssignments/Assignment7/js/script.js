window.onscroll = function() {scrollFunction()};

    function scrollFunction() {
      if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("myBtn").style.display = "block";
      } else {
        document.getElementById("myBtn").style.display = "none";
      }
    }

    function topFunction() {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    }


    function check(){
      if(document.getElementById('business').checked ){
        document.getElementById('businessData').style.display = 'flex';
        document.getElementById('communityData').style.display = 'none';
        document.getElementById('switching').style.left = "2px";
        //console.log("business section");
      }
      else{
        document.getElementById('communityData').style.display ='flex';
        document.getElementById('businessData').style.display = 'none';
        document.getElementById('switching').style.left = "90px";
        //console.log("community")
      }
    }

    