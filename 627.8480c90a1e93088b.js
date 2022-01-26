"use strict";(self.webpackChunkAngular=self.webpackChunkAngular||[]).push([[627],{7627:(v,l,r)=>{r.r(l),r.d(l,{AuthModule:()=>_});var P=r(6019),g=r(1729),d=r(8239),i=r(9133),t=r(3668),p=r(3798),f=r(1620),Z=r(4522);let C=(()=>{class n{constructor(e){this.http=e,this.url="/auth"}getToken(e){return this.http.post(`${f.h}${this.url}/login`,e)}signUp(e){return this.http.post(`${f.h}${this.url}/signUp`,e)}}return n.\u0275fac=function(e){return new(e||n)(t.LFG(Z.eN))},n.\u0275prov=t.Yz7({token:n,factory:n.\u0275fac,providedIn:"root"}),n})();var u=r(8167),h=r(138),b=r(86),y=r(7964);const M=[{path:"",component:(()=>{class n{constructor(e,o,s){this.router=e,this.dataService=o,this.authService=s,this.loginInput={Username:"",Password:""},this.buttonDisabled=!1,this.user="",this.sessionExpired=!1,this.loginForm=new i.cw({username:new i.NI(""),password:new i.NI("")})}ngOnInit(){if(this.stateSubscription=this.dataService.userState.subscribe(o=>this.sessionExpired=o),this.sessionExpired){var e=document.getElementById("message-section");document.getElementById("messageOutput").innerHTML="Your session has expired. Please log in again.",e.style.backgroundColor="rgba(255, 255, 255, 0.95)"}this.dataService.changeUserState(!1),this.userSubscription=this.dataService.currentUser.subscribe(o=>this.user=o.username),""!=this.user&&this.loginForm.patchValue({username:this.user})}ngOnDestroy(){this.stateSubscription.unsubscribe(),this.userSubscription.unsubscribe()}sleep(e){return new Promise(o=>setTimeout(o,e))}Login(){var e=this;return(0,d.Z)(function*(){var o=document.getElementById("buttonPressed");o.style.display="flex",e.buttonDisabled=!0,yield e.sleep(1500),e.loginInput.Password=e.loginForm.value.password,e.loginInput.Username=e.loginForm.value.username,e.authService.getToken(e.loginInput).subscribe({next:s=>{localStorage.setItem("Role",s.role),localStorage.setItem("Token",s.accessToken),localStorage.setItem("Username",e.loginInput.Username),e.dataService.changeUserData(e.loginForm.value),e.router.navigate(["/main/vehicles"])},error:s=>{clearTimeout(e.messageTimeout);var m,c=document.getElementById("message-section");m="User does not exist!"==s.error?"Incorrect username.":"User is locked out!"==s.error?"Too many login attempts! Try again later.":"Incorrect password.",document.getElementById("messageOutput").innerHTML=m,c.style.backgroundColor="rgba(255, 255, 255, 0.95)",o.style.display="none",e.buttonDisabled=!1,e.messageTimeout=setTimeout(()=>{document.getElementById("messageOutput").innerHTML="",c.style.backgroundColor="rgba(255, 255, 255, 0)"},5e3)}})})()}get username(){return this.loginForm.get("username")}}return n.\u0275fac=function(e){return new(e||n)(t.Y36(g.F0),t.Y36(p.D),t.Y36(C))},n.\u0275cmp=t.Xpm({type:n,selectors:[["app-login"]],decls:35,vars:3,consts:[[1,"myContainer"],[1,"myTitle"],["id","message-section"],["id","messageOutput"],[1,"form-section"],[1,"myHeader"],[1,"myForm",3,"formGroup"],["appearance","outline"],["matInput","","formControlName","username"],["matInput","","placeholder","*******","type","password","formControlName","password"],["mat-flat-button","","color","accent",1,"button",3,"disabled","click"],[1,"signUp"],["href","/auth/signup"],["id","buttonPressed"],[1,"spinner",3,"diameter"],["id","myFooter"],["id","footerText"],["mat-flat-button","","icon","home","id","githubIcon","color","accent","onClick","window.open('https://github.com/cristivasile/Prospect_Auto_Website')"]],template:function(e,o){1&e&&(t.TgZ(0,"div",0),t.TgZ(1,"div",1),t.TgZ(2,"p"),t._uU(3," Prospect Auto "),t.qZA(),t.qZA(),t.TgZ(4,"div",2),t._UZ(5,"p",3),t.qZA(),t.TgZ(6,"div",4),t.TgZ(7,"div",5),t.TgZ(8,"p"),t._uU(9," Welcome! Please log in."),t.qZA(),t.qZA(),t.TgZ(10,"form",6),t.TgZ(11,"mat-form-field",7),t.TgZ(12,"mat-label"),t._uU(13,"Username"),t.qZA(),t._UZ(14,"input",8),t.qZA(),t.TgZ(15,"mat-form-field",7),t.TgZ(16,"mat-label"),t._uU(17,"Password"),t.qZA(),t._UZ(18,"input",9),t.qZA(),t.qZA(),t.TgZ(19,"button",10),t.NdJ("click",function(){return o.Login()}),t._uU(20," Login "),t.qZA(),t.TgZ(21,"div",11),t.TgZ(22,"p"),t._uU(23," Don't have an account? "),t.TgZ(24,"a",12),t.TgZ(25,"u"),t._uU(26,"Sign up"),t.qZA(),t.qZA(),t._uU(27," instead."),t.qZA(),t.qZA(),t.qZA(),t.TgZ(28,"div",13),t._UZ(29,"mat-spinner",14),t.qZA(),t.TgZ(30,"footer",15),t.TgZ(31,"p",16),t._uU(32," Vasile George-Cristian "),t.qZA(),t.TgZ(33,"button",17),t._uU(34,"GitHub"),t.qZA(),t.qZA(),t.qZA()),2&e&&(t.xp6(10),t.Q6J("formGroup",o.loginForm),t.xp6(9),t.Q6J("disabled",o.buttonDisabled),t.xp6(10),t.Q6J("diameter",70))},directives:[i._Y,i.JL,i.sg,u.KE,u.hX,h.Nt,i.Fj,i.JJ,i.u,b.lW,y.$g],styles:[".myContainer[_ngcontent-%COMP%]{width:100%;box-sizing:content-box;height:100%;display:flex;align-items:center;flex-direction:column;background-image:url(/assets/images/background.jpg)}.myContainer[_ngcontent-%COMP%]   #buttonPressed[_ngcontent-%COMP%]{display:none;position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);height:10%;width:8%;border-radius:2em;align-items:center;justify-content:center;background-color:#1565c0}.myContainer[_ngcontent-%COMP%]   #buttonPressed[_ngcontent-%COMP%]     .mat-progress-spinner circle, .myContainer[_ngcontent-%COMP%]   #buttonPressed[_ngcontent-%COMP%]   .mat-spinner[_ngcontent-%COMP%]   circle[_ngcontent-%COMP%]{stroke:#a8ebff}.myContainer[_ngcontent-%COMP%]   .myTitle[_ngcontent-%COMP%]{margin-top:5%;font-size:5em;height:auto;font-weight:bold;color:#1565c0}.myContainer[_ngcontent-%COMP%]   .form-section[_ngcontent-%COMP%]{border-radius:2em;width:30%;height:auto;display:flex;flex-direction:column;align-items:center;justify-content:space-around;background-color:#fffffff2;margin-bottom:2.5%}.myContainer[_ngcontent-%COMP%]   .form-section[_ngcontent-%COMP%]     .mat-form-field-appearance-outline.mat-focused .mat-form-field-outline-thick{color:#009688}.myContainer[_ngcontent-%COMP%]   .form-section[_ngcontent-%COMP%]   .myHeader[_ngcontent-%COMP%]{margin-top:2em;margin-bottom:1.3em;font-size:1.75em;font-weight:bold;color:#1565c0}.myContainer[_ngcontent-%COMP%]   .form-section[_ngcontent-%COMP%]   .button[_ngcontent-%COMP%]{margin-top:2%;background-color:#009688}.myContainer[_ngcontent-%COMP%]   .form-section[_ngcontent-%COMP%]   .signUp[_ngcontent-%COMP%]{color:#1565c0;margin-top:.7em;margin-bottom:0%}.myContainer[_ngcontent-%COMP%]   #message-section[_ngcontent-%COMP%]{margin-top:7%;width:auto;max-width:30%;height:auto;padding:1%;display:flex;flex-direction:column;align-items:center;justify-content:center;border-radius:2em}.myContainer[_ngcontent-%COMP%]   #message-section[_ngcontent-%COMP%]   #messageOutput[_ngcontent-%COMP%]{color:red;font-weight:bold;font-size:1.2em;margin-bottom:0}.myContainer[_ngcontent-%COMP%]   .myForm[_ngcontent-%COMP%]{width:70%}.myContainer[_ngcontent-%COMP%]   .myForm[_ngcontent-%COMP%]   .mat-form-field[_ngcontent-%COMP%]{width:100%}.myContainer[_ngcontent-%COMP%]   #myFooter[_ngcontent-%COMP%]{width:25%;box-sizing:content-box;position:absolute;bottom:0;display:flex;flex-direction:row;justify-content:space-around;font-weight:bold;align-items:center;padding:.5% 1%;background-color:#ffffffbf;border-radius:1em 1em 0 0}.myContainer[_ngcontent-%COMP%]   #myFooter[_ngcontent-%COMP%]   #footerText[_ngcontent-%COMP%]{color:#1565c0;margin-right:10%;font-size:1.4em;margin-bottom:0}",".myContainer[_ngcontent-%COMP%]{display:flex}.myContainer[_ngcontent-%COMP%]   .form-section[_ngcontent-%COMP%]{margin-top:2%}"]}),n})()},{path:"signup",component:(()=>{class n{constructor(e,o,s){this.router=e,this.dataService=o,this.authService=s,this.signupInput={Username:"",Email:"",Password:"",RepeatedPassword:""},this.buttonDisabled=!1,this.signupForm=new i.cw({email:new i.NI(""),username:new i.NI(""),password:new i.NI(""),repeatedPassword:new i.NI("")})}ngOnInit(){}sleep(e){return new Promise(o=>setTimeout(o,e))}Signup(){var e=this;return(0,d.Z)(function*(){e.signupInput.Email=e.signupForm.value.email,e.signupInput.Password=e.signupForm.value.password,e.signupInput.Username=e.signupForm.value.username,e.signupInput.RepeatedPassword=e.signupForm.value.repeatedPassword;var o=document.getElementById("buttonPressed");o.style.display="flex",e.buttonDisabled=!0,yield e.sleep(1500),e.authService.signUp(e.signupInput).subscribe({next:s=>{clearTimeout(e.messageTimeout),document.getElementById("signupButton").disabled=!0;var m=document.getElementById("messageOutput");m.innerHTML="Sign up complete. You will be redirected!",m.style.color="green",document.getElementById("message-section").style.backgroundColor="rgba(255, 255, 255, 0.95)",e.dataService.changeUserData(e.signupForm.value),setTimeout(()=>{e.router.navigate(["/auth"])},2e3)},error:s=>{clearTimeout(e.messageTimeout);var c=document.getElementById("message-section");document.getElementById("messageOutput").innerHTML=s.error,c.style.backgroundColor="rgba(255, 255, 255, 0.95)",o.style.display="none",e.buttonDisabled=!1,e.messageTimeout=setTimeout(()=>{document.getElementById("messageOutput").innerHTML="",c.style.backgroundColor="rgba(255, 255, 255, 0)"},5e3)}})})()}}return n.\u0275fac=function(e){return new(e||n)(t.Y36(g.F0),t.Y36(p.D),t.Y36(C))},n.\u0275cmp=t.Xpm({type:n,selectors:[["app-signup"]],decls:43,vars:3,consts:[[1,"myContainer"],[1,"myTitle"],["id","message-section"],["id","messageOutput"],[1,"form-section"],[1,"myHeader"],[1,"myForm",3,"formGroup"],["appearance","outline"],["matInput","","placeholder","email@email.email","formControlName","email"],["matInput","","placeholder","username","formControlName","username"],["matInput","","placeholder","*******","type","password","formControlName","password"],["matInput","","placeholder","*******","type","password","formControlName","repeatedPassword"],["id","signupButton","mat-flat-button","","color","accent",1,"button",3,"disabled","click"],["id","buttonPressed"],[1,"spinner",3,"diameter"],[1,"signUp"],["href","/auth"],["id","myFooter"],["id","footerText"],["mat-flat-button","","id","githubIcon","color","accent","onClick","window.open('https://github.com/cristivasile/Prospect_Auto_Website')"]],template:function(e,o){1&e&&(t.TgZ(0,"div",0),t.TgZ(1,"div",1),t.TgZ(2,"p"),t._uU(3," Prospect Auto "),t.qZA(),t.qZA(),t.TgZ(4,"div",2),t._UZ(5,"p",3),t.qZA(),t.TgZ(6,"div",4),t.TgZ(7,"div",5),t.TgZ(8,"p"),t._uU(9," Create an account"),t.qZA(),t.qZA(),t.TgZ(10,"form",6),t.TgZ(11,"mat-form-field",7),t.TgZ(12,"mat-label"),t._uU(13,"Email"),t.qZA(),t._UZ(14,"input",8),t.qZA(),t.TgZ(15,"mat-form-field",7),t.TgZ(16,"mat-label"),t._uU(17,"Username"),t.qZA(),t._UZ(18,"input",9),t.qZA(),t.TgZ(19,"mat-form-field",7),t.TgZ(20,"mat-label"),t._uU(21,"Password"),t.qZA(),t._UZ(22,"input",10),t.qZA(),t.TgZ(23,"mat-form-field",7),t.TgZ(24,"mat-label"),t._uU(25,"Repeat password"),t.qZA(),t._UZ(26,"input",11),t.qZA(),t.qZA(),t.TgZ(27,"button",12),t.NdJ("click",function(){return o.Signup()}),t._uU(28," Sign up "),t.qZA(),t.TgZ(29,"div",13),t._UZ(30,"mat-spinner",14),t.qZA(),t.TgZ(31,"div",15),t.TgZ(32,"p"),t._uU(33," Already have an account? "),t.TgZ(34,"a",16),t.TgZ(35,"u"),t._uU(36,"Log in"),t.qZA(),t.qZA(),t._uU(37," instead."),t.qZA(),t.qZA(),t.qZA(),t.TgZ(38,"footer",17),t.TgZ(39,"p",18),t._uU(40," Vasile George-Cristian "),t.qZA(),t.TgZ(41,"button",19),t._uU(42,"GitHub"),t.qZA(),t.qZA(),t.qZA()),2&e&&(t.xp6(10),t.Q6J("formGroup",o.signupForm),t.xp6(17),t.Q6J("disabled",o.buttonDisabled),t.xp6(3),t.Q6J("diameter",70))},directives:[i._Y,i.JL,i.sg,u.KE,u.hX,h.Nt,i.Fj,i.JJ,i.u,b.lW,y.$g],styles:[".myContainer[_ngcontent-%COMP%]{width:100%;box-sizing:content-box;height:100%;display:flex;align-items:center;flex-direction:column;background-image:url(/assets/images/background.jpg)}.myContainer[_ngcontent-%COMP%]   #buttonPressed[_ngcontent-%COMP%]{display:none;position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);height:10%;width:8%;border-radius:2em;align-items:center;justify-content:center;background-color:#1565c0}.myContainer[_ngcontent-%COMP%]   #buttonPressed[_ngcontent-%COMP%]     .mat-progress-spinner circle, .myContainer[_ngcontent-%COMP%]   #buttonPressed[_ngcontent-%COMP%]   .mat-spinner[_ngcontent-%COMP%]   circle[_ngcontent-%COMP%]{stroke:#a8ebff}.myContainer[_ngcontent-%COMP%]   .myTitle[_ngcontent-%COMP%]{margin-top:5%;font-size:5em;height:auto;font-weight:bold;color:#1565c0}.myContainer[_ngcontent-%COMP%]   .form-section[_ngcontent-%COMP%]{border-radius:2em;width:30%;height:auto;display:flex;flex-direction:column;align-items:center;justify-content:space-around;background-color:#fffffff2;margin-bottom:2.5%}.myContainer[_ngcontent-%COMP%]   .form-section[_ngcontent-%COMP%]     .mat-form-field-appearance-outline.mat-focused .mat-form-field-outline-thick{color:#009688}.myContainer[_ngcontent-%COMP%]   .form-section[_ngcontent-%COMP%]   .myHeader[_ngcontent-%COMP%]{margin-top:2em;margin-bottom:1.3em;font-size:1.75em;font-weight:bold;color:#1565c0}.myContainer[_ngcontent-%COMP%]   .form-section[_ngcontent-%COMP%]   .button[_ngcontent-%COMP%]{margin-top:2%;background-color:#009688}.myContainer[_ngcontent-%COMP%]   .form-section[_ngcontent-%COMP%]   .signUp[_ngcontent-%COMP%]{color:#1565c0;margin-top:.7em;margin-bottom:0%}.myContainer[_ngcontent-%COMP%]   #message-section[_ngcontent-%COMP%]{margin-top:7%;width:auto;max-width:30%;height:auto;padding:1%;display:flex;flex-direction:column;align-items:center;justify-content:center;border-radius:2em}.myContainer[_ngcontent-%COMP%]   #message-section[_ngcontent-%COMP%]   #messageOutput[_ngcontent-%COMP%]{color:red;font-weight:bold;font-size:1.2em;margin-bottom:0}.myContainer[_ngcontent-%COMP%]   .myForm[_ngcontent-%COMP%]{width:70%}.myContainer[_ngcontent-%COMP%]   .myForm[_ngcontent-%COMP%]   .mat-form-field[_ngcontent-%COMP%]{width:100%}.myContainer[_ngcontent-%COMP%]   #myFooter[_ngcontent-%COMP%]{width:25%;box-sizing:content-box;position:absolute;bottom:0;display:flex;flex-direction:row;justify-content:space-around;font-weight:bold;align-items:center;padding:.5% 1%;background-color:#ffffffbf;border-radius:1em 1em 0 0}.myContainer[_ngcontent-%COMP%]   #myFooter[_ngcontent-%COMP%]   #footerText[_ngcontent-%COMP%]{color:#1565c0;margin-right:10%;font-size:1.4em;margin-bottom:0}",".myContainer[_ngcontent-%COMP%]   .form-section[_ngcontent-%COMP%]{margin-top:1%}.myContainer[_ngcontent-%COMP%]   #message-section[_ngcontent-%COMP%]{margin-top:5%}"]}),n})()}];let O=(()=>{class n{}return n.\u0275fac=function(e){return new(e||n)},n.\u0275mod=t.oAB({type:n}),n.\u0275inj=t.cJS({imports:[[g.Bz.forChild(M)],g.Bz]}),n})();var T=r(4855);let _=(()=>{class n{}return n.\u0275fac=function(e){return new(e||n)},n.\u0275mod=t.oAB({type:n}),n.\u0275inj=t.cJS({imports:[[P.ez,O,T.q,i.UX]]}),n})()}}]);