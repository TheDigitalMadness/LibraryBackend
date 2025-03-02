<h1> Here is the documentation for my api </h1>

All routes start with "website/route"

<h2>Routes</h2>

<h3>/auth</h3>

<ul>
<li>
<b>/register</b>
<br>
<ul>
<li>
<b>input format:</b>
</li>
{ <br>
  "email": email, not empty <br>
  "password": string, not empty <br>
  "username": string <br>
}
<li>
<b>output format:</b>
</li>
{ <br>
  "access_token": access_token, string <br>
}
</ul>
</li>
<li>
<b>/login</b>
</li>
<li>
<b>/me</b>
</li>
</ul>