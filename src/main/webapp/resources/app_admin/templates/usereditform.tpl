 <!-- Форма для ввода/редактирования информации о пользователях -->
  	  
  	  
      <!-- Заголовок модального окна -->
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
        <h4 class="modal-title"><%= operation%></h4>
      </div>
      
     <!-- Основное содержимое модального окна -->
     <div class="modal-body">  	 
     
     <% if (mode !== 'editmode') { %> 
     
  		<div class="form-group">
			<label class="control-label" for="inputDefault">Имя пользователя</label>
			<input type="text" class="form-control" id="usernameinput">
		</div>
		
		<div class="form-group">
			<label class="control-label" for="inputPassword">Пароль пользователя</label>			
			<input type="password" class="form-control" id="inputPasswordnew" placeholder="Введите пароль"/>
			<input type="password" class="form-control" id="inputPasswordCopynew" placeholder="Повторите пароль"/>			
			<div class="checkbox">
					<label>
						<input id="passcheckboxnew" class="passcheckbox" type="checkbox"> Показать пароль </input>
					</label>
			</div>
		</div>
		
		<div class="form-group">			
			<div class="form-group">
				<label class="control-label" for="disabledInput">Группы Пользователей</label>
				<div class="input-group">
					<input class="form-control" id="usergroupsinputnew" type="text" placeholder="Добавьте группы из справочника" disabled="">
					<span class="input-group-btn">
						<button id="sprgroupsbtnnew" href="#sprform" type="button" class="btn btn-default sprgroupsbtn" data-toggle="modal" 
                                onclick="ZUI.modalToBack('modal-backdrop','editform');">Открыть</button>
					</span>
				</div>
			</div>
		</div>			
		
		<%} else {%>		   
        <% casheusers.each(function(user) {%>
         
         <div class="form-group">
			<label class="control-label" for="inputDefault">Имя пользователя</label>
			<input type="text" class="form-control" id="usernameinput<%=user.get('id')%>" value="<%= user.get('login')%>">
		</div>
        
        <div class="form-group">
			<label class="control-label" for="inputPassword">Пароль пользователя</label>
					
			<input type="password" class="form-control" id="inputPassword<%=user.get('id')%>" disabled="" placeholder="Введите пароль" value="<%= user.get('password')%>"/>
			<input type="password" class="form-control" id="inputPasswordCopy<%=user.get('id')%>" disabled="" placeholder="Повторите пароль" value="<%= user.get('password')%>"/>			
			
			<div>
			<span class="checkbox">
					<label>
						<input id="passcheckbox<%=user.get('id')%>" class="passcheckbox" type="checkbox"> Показать пароль </input>
					</label>
			</span>
			
			<span class="checkbox">
					<label>
						<input id="changepasscheckbox<%=user.get('id')%>" class="changepasscheckbox" type="checkbox"> Изменить пароль </input>
					</label>
			</span>
			</div>	
		</div>
		 
        <% 
		 		var content = ''; 
		 		var groupsarray = _.clone(user.get("userGroups"));
		    			        			    		
		    			            		// собираем строку имен ролей
		    			        			var content = '';		    			        	
		    			        			_.each(groupsarray, function(group) {
				    			        			content+=group.name+'   ';
		    			        				})	
		%> 
         
         <div class="form-group">			
			<div class="form-group">
				<label class="control-label" for="disabledInput">Группы Пользователей</label>
				<div class="input-group">
					<input class="form-control" id="usergroupsinput<%=user.get('id')%>" type="text" placeholder="Добавьте группы из справочника" disabled="" value="<%= content%>">
					<span class="input-group-btn">
						<button id="sprgroupsbtn<%=user.get('id')%>" href="#sprform" type="button" class="btn btn-default sprgroupsbtn" data-toggle="modal" 
                                onclick="ZUI.modalToBack('modal-backdrop','editform');">Открыть</button>
					</span>
				</div>
			</div>
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
        <button type="button" id="cancelbtn" class="btn btn-default" data-dismiss="modal">Отменить</button>             
     </div>
  