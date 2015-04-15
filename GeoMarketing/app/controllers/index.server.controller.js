exports.render = function(req, res) {
res.render('index',{title:'GeoMarkting',user:JSON.stringify(req.user)});
};
