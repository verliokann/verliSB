	<!-- Заголовок модального окна --> 
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
        <h4 class="modal-title">Справочник <%= sprname%></h4>
      </div>      
      
      <!-- Основное содержимое модального окна -->
      <div class="modal-body">        
		  <div id="sprGridPlace" class="form-group">
								
		  </div>
	  </div>	  	
      
          <!-- Футер модального окна -->
      <div class="modal-footer">        
         	<button id="addsprdatabtn" type="button" class="btn btn-default" data-dismiss="modal" onclick="ZUI.modalToFront('firstlevelfade', 'editform');">Добавить</button>
        	<button id="closesprbtn" type="button" class="btn btn-default" data-dismiss="modal" onclick="ZUI.modalToFront('firstlevelfade', 'editform');">Закрыть</button>                 
      </div>
      
  