    function processImage(inputImage) {
        // **********************************************
        // *** Update or verify the following values. ***
        // **********************************************

        // Replace the SUBSCRIPTIONKEY string value with your valid subscription key.
        var SUBSCRIPTIONKEY = "ae720e69309a454981070ae9f07a0ef7";

        // Replace or verify the region.
        //
        // You must use the same region in your REST API call as you used to obtain your subscription keys.
        // For example, if you obtained your subscription keys from the westus region, replace
        // "westcentralus" in the URI below with "westus".
        //
        // NOTE: Free trial subscription keys are generated in the westcentralus region, so if you are using
        // a free trial subscription key, you should not need to change this region.
        var URIBASE = "https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect";
        var URIBASEVERIFY = "https://westcentralus.api.cognitive.microsoft.com/face/v1.0/verify";
        
        // Request parameters.
        var params = {
            "returnFaceId": "true",
            "returnFaceLandmarks": "false",
            "returnFaceAttributes": "age,gender,headPose,smile,facialHair,glasses,emotion,hair,makeup,occlusion,accessories,blur,exposure,noise",
        };

        // Display the image.
        //console.log(inputImage);
        //console.log(document.getElementById("inputImage"+inputImage).value);
        var sourceImageUrl = document.getElementById("inputImage"+inputImage).value;
        document.querySelector("#sourceImage"+inputImage).src = sourceImageUrl;

        // Perform the REST API call.
        $.ajax({
            url: URIBASE + "?" + $.param(params),

            // Request headers.
            beforeSend: function(xhrObj){
                xhrObj.setRequestHeader("Content-Type","application/json");
                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", SUBSCRIPTIONKEY);
            },

            type: "POST",

            // Request body.
            data: '{"url": ' + '"' + sourceImageUrl + '"}',
        })

        .done(function(data) {
            // Show formatted JSON on webpage.
            //$("#responseTextArea").val(JSON.stringify(data, null, 2));
            //console.log("hiddenImage"+inputImage+"FaceId");
            document.getElementById("hidden"+inputImage+"FaceId").value = data[0].faceId;
        })

        .fail(function(jqXHR, textStatus, errorThrown) {
            // Display error message.
            var errorString = (errorThrown === "") ? "Error. " : errorThrown + " (" + jqXHR.status + "): ";
            errorString += (jqXHR.responseText === "") ? "" : (jQuery.parseJSON(jqXHR.responseText).message) ? 
                jQuery.parseJSON(jqXHR.responseText).message : jQuery.parseJSON(jqXHR.responseText).error.message;
            alert(errorString);
        });
    };

    function checkIdentity() {
        // **********************************************
        // *** Update or verify the following values. ***
        // **********************************************

        // Replace the SUBSCRIPTIONKEY string value with your valid subscription key.
        var SUBSCRIPTIONKEY = "ae720e69309a454981070ae9f07a0ef7";

        // Replace or verify the region.
        //
        // You must use the same region in your REST API call as you used to obtain your subscription keys.
        // For example, if you obtained your subscription keys from the westus region, replace
        // "westcentralus" in the URI below with "westus".
        //
        // NOTE: Free trial subscription keys are generated in the westcentralus region, so if you are using
        // a free trial subscription key, you should not need to change this region.
        var URIBASEVERIFY = "https://westcentralus.api.cognitive.microsoft.com/face/v1.0/verify";
        
        var imageBaseFaceId = document.getElementById("hiddenBaseFaceId").value;
        var imageIdentityFaceId = document.getElementById("hiddenIdentityFaceId").value;

        // Display the image.
        //console.log(inputImage);
        //console.log(document.getElementById("inputImage"+inputImage).value);

        // Perform the REST API call.
        $.ajax({
            url: URIBASEVERIFY,

            // Request headers.
            beforeSend: function(xhrObj){
                xhrObj.setRequestHeader("Content-Type","application/json");
                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", SUBSCRIPTIONKEY);
            },

            type: "POST",

            // Request body.
            data: '{"faceId1":"'+ imageBaseFaceId + '","faceId2":"'+ imageIdentityFaceId +'"}',
        })

        .done(function(data) {
            // Show formatted JSON on webpage.
            $("#responseTextArea").val(JSON.stringify(data, null, 2));
            //console.log("hiddenImage"+inputImage+"FaceId");
            //document.getElementById("hidden"+inputImage+"FaceId").value = data[0].faceId;
            //console.log(data[0].faceId);
        })

        .fail(function(jqXHR, textStatus, errorThrown) {
            // Display error message.
            var errorString = (errorThrown === "") ? "Error. " : errorThrown + " (" + jqXHR.status + "): ";
            errorString += (jqXHR.responseText === "") ? "" : (jQuery.parseJSON(jqXHR.responseText).message) ? 
                jQuery.parseJSON(jqXHR.responseText).message : jQuery.parseJSON(jqXHR.responseText).error.message;
            alert(errorString);
        });
    };

