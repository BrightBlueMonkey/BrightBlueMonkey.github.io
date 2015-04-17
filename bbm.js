function load() 
{
	findAndLoadImages("samplecards");
	console.log("Finished loading images");
}

function findAndLoadImages(path)
{
	var fileextensions = ["png", "jpg"];
	$.ajax({
		//This will retrieve the contents of the folder if the folder is configured as 'browsable'
		url: path + "/",
		success: function (data)
		{
			//Lsit all png file names in the page
			$(data).find("a").each(function ()
			{
				var filename = this.href.replace(window.location, "").replace("http:///", "");
				if(fileextensions.indexOf(getFileExt(filename)) >= 0)
				{
					id = filename.slice(0, filename.lastIndexOf("."));
					//$("body").append($("<img id=\"" + id + "\"onclick=\"loadCardData('" + id + "')\" src=" + path + "/" + filename + ">"));
					$("body").append($("<img id=\"" + id + "\" src=" + path + "/" + filename + ">").click(function(){
						console.log("Loading card: \"" + $(this).attr('id') + "\"");
						//$(this).hide();
						$.get("database.php?q=" + $(this).attr('id'), function(data, status)
                        {
							$("#data").html(data)
						});
					}));
				}
			});
		}
	});
}

function getFileExt(filename)
{
	var a = filename.split(".");
	if(a.length === 1 || (a[0] === "" && a.length === 2))
	{
		return "";
	}
	var b = a.pop().toLowerCase();
	console.log(b);
	return b;
}
