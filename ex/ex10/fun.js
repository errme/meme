function $(id){return document.getElementById(id);}
function computer_sum(n)
{
	var sum=0;
	for(var i=1,x=1;i<=n;i++)
	{
		x *= i;
		sum += x;
	}
	return sum;
}
function showSum()
{
	var n=parseFloat($("Number").value);
	$("Sum").value=computer_sum(n);
}