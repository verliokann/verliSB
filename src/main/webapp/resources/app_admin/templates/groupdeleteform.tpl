<!-- ------------------------ Шаблон формы удаления записи -------------------------------------- -->


      <!-- Заголовок модального окна -->
     <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
        <h4 class="modal-title">Удаление записей </h4>
      </div>
      <!-- Основное содержимое модального окна -->
      <div class="modal-body">
        <div class="form-group">        
        	<% cashegroups.each(function(group) {%>
        	 <div>
  	    	  <label class="label label-warning" for="inputDefault"><%= group.get('id') %></label>	
  	    	  <label class="label label-warning" for="inputDefault"><%= group.get('name') %></label>  	    	  
  	    	 <div> 
  	    	<%});%>				
		</div>		
      <!-- Футер модального окна -->
      <div class="modal-footer">
        <button type="button" id="delbtn" class="btn btn-default" data-dismiss="modal">Удалить</button>
        <button type="button" id="cslbtn" class="btn btn-default" data-dismiss="modal">Отменить</button>        
      </div>
    </div>
  