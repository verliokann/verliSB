<!-- Форма для ввода/редактирования информации о группах пользователей -->


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
					<input type="text" class="form-control" id="groupnameinput">
				</div>
				
				<div class="form-group">			
					<div class="form-group">
						<label class="control-label" for="disabledInput">Роли группы</label>
						<div class="input-group">
							<input class="form-control" id="grouprolesinputnew" type="text" placeholder="Добавьте роли из справочника" disabled="">
							<span class="input-group-btn">
								<button id="sprrolesbtnnew" href="#sprform" type="button" class="btn btn-default sprrolesbtn" data-toggle="modal" 
		                                onclick="ZUI.modalToBack('modal-backdrop','editform');">Открыть</button>
							</span>
						</div>
					</div>
				</div>
				
				<div class="form-group">
					<label class="control-label" for="inputDefault">Описание</label>
					<input type="text" class="form-control" id="inputDefault">
				</div>
		    
	    		
	       		<%} else {%>         
			   
           		<% cashegroups.each(function(group) {%>
			    
			    <div class="form-group">
					<label class="control-label" for="inputDefault">Название</label>
					<input type="text" class="form-control" id="groupnameinput<%=group.get('id')%>" value="<%= group.get('name')%>">
				</div>
				
		 		<% 
		 		var content = ''; 
		 		var rolesarray = _.clone(group.get("roles"));
		    			        			    		
		    			            		// собираем строку имен ролей
		    			        			var content = '';		    			        	
		    			        			_.each(rolesarray, function(role) {
				    			        			content+=role.rolename+'   ';
		    			        				})	
				%>
				
				<div class="form-group">			
					<div class="form-group">
						<label class="control-label" for="disabledInput">Роли группы</label>
						<div class="input-group">
							<input class="form-control" id="grouprolesinput<%=group.get('id')%>" type="text" placeholder="Роли группы" disabled="" value="<%= content%>">
							<span class="input-group-btn">
								<button id="sprrolesbtn<%=group.get('id')%>" href="#sprform" type="button" class="btn btn-default sprrolesbtn" data-toggle="modal" 
		                                onclick="ZUI.modalToBack('modal-backdrop','editform');">Открыть</button>
							</span>
						</div>
					</div>
				</div>
				
				<div class="form-group">
					<label class="control-label" for="inputDefault">Описание</label>
					<input type="text" class="form-control" id="inputDefault">
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

					  