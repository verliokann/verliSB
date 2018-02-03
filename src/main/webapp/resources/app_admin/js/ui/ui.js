var ZUI ={
		modalToBack: function(fadeclassname, modalid)
		{
			block = document.getElementsByClassName(fadeclassname);
			block[0].id="firstlevelfade";
			block = document.getElementById(modalid);
			block.className="modal firstlevelmodal";    
		},

		modalToFront: function(fadeflvlmodalid, modalflvlid)
		{
			block = document.getElementById(fadeflvlmodalid);
			block.id=""; 
			block = document.getElementById(modalflvlid);
			block.className="modal";       
		},
		
		//Открывает контентную часть модельных форм ввода/редактирования данных
		//Стиль unvisibleblock описан в файле /resources/app_admin/css/admin_main.css
		refreshModal: function(block1,block2,block3)
		{
		    document.getElementById(block1).className="modal-content";
		    document.getElementById(block2).className="modal-content unvisibleblock";
		    document.getElementById(block3).className="modal-content unvisibleblock";
		}, 
		
		loadCss: function (url) {
		    var link = document.createElement("link");
		    link.type = "text/css";
		    link.rel = "stylesheet";
		    link.href = url;
		    document.getElementsByTagName("head")[0].appendChild(link);
		}
		
		
}

