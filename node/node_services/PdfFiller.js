exports.api = {
    //Returns a template for a PDF template.
    // inputs:
    //    call.arguments.filename - string
    // returns: string
    ExtractTemplate : function(call) {
        var pdfFiller = require('pdffiller-electron');
        var FDF_data = pdfFiller.generateFDFTemplate( call.arguments.filename, null , function(err, fdfData) {
   			 if (err) {
   			 	call.error(err);
   			 } else {
   			 	call.return(fdfData);
   			 }
		});
    },
    //Construct a filled PDF from a template and JSON data.
    // inputs:
    //    call.arguments.sourcefile - string
    //    call.arguments.destfile - string
    //    call.arguments.data - string
    // returns: bool
    FillinTemplate : function(call) {
        var pdfFiller = require('pdffiller-electron');
        try {
	       var data =  JSON.parse(call.arguments.data);
	       pdfFiller.fillForm(  call.arguments.sourcefile, call.arguments.destfile, data, function(err) {
			    if (err) {
			        call.error(err);
			    } else {
			        call.return(true);
			    }
		   });
		} catch(err) {
		   call.error(err);
		}      
    }
};
