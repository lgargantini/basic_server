
module.exports= function (app,controller) {

app.get('/',controller.general.index);

app.post('/validate', controller.general.validate);
app.get('/validate/:number', controller.general.validate);

app.get('/logout',controller.general.logout);
}