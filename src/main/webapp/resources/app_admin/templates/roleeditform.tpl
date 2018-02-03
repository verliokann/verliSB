<!-- Форма для ввода/редактирования информации о ролях пользователей -->
 
  
      <!-- Заголовок модального окна -->
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
        <h4 class="modal-title"><%= operation%></h4>
      </div>
      
     <!-- Основное содержимое модального окна -->
     <div class="modal-body">
       
       <% if (mode !== 'editmode') { %> 	 	
       
	  		<div class="form-group">
				<label class="control-label" for="inputDefault">Название</label>
				<input type="text" class="form-control" id="rolenameinput"/>
			</div>
			<div class="form-group">
				<label class="control-label" for="inputDefault">Описание</label>
				<input type="text" class="form-control" id="roledescriptioninput"/>
			</div>
			
				
	   <%} else {%>         
	   
           <% casheroles.each(function(role) {%>
			
			<div class="form-group">
				<label class="control-label" for="inputDefault">Название</label>
				<input type="text" class="form-control" id="rolenameinput<%=role.get('id')%>" value="<%= role.get('rolename')%>"/>
			</div>
			<div class="form-group">
				<label class="control-label" for="inputDefault">Описание</label>
				<input type="text" class="form-control" id="roledescriptioninput<%=role.get('id')%>" value="<%= role.get('description') %>"/>
			</div>
			
			<% });%>
          <%}%> 
			
      </div>      
      
      <!-- Футер модального окна -->
      <div class="modal-footer">
        <% if (mode !== 'editmode') { %>
           <button type="button" id="addbtn" class="btn btn-default" data-dismiss="modal">Сохранить</button>        
         <%} else {%>   
           <button type="button" id="updbtn" class="btn btn-default" data-dismiss="modal">Сохранить</button>
         <%}%>  
        <button type="button" class="btn btn-default" data-dismiss="modal">Отменить</button>             
      </div>
 