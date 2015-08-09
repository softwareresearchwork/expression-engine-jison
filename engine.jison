%lex

%{
	// console.log("before the parser");
%}


num				[0-9]+("."[0-9]+)?\b
var				[a-zA-Z][a-zA-Z0-9_]*
ws				\s+

%%

"("				return 'LPAREN';
")"				return 'RPAREN';

"if"			return 'IF';
"then"			return 'THEN';
"endif"			return 'ENDIF';
"else"			return 'ELSE';
'<>'			return '<>'
'=='			return '=='
'<='			return '<='
'>='			return '>='
'<'				return '<'
'>'				return '>'
'&&'			return '&&'
'||'			return '||'

"="				return '=';
"+"				return '+';
"-"				return '-';
"*"				return '*';
"/"				return '/';
"%"				return '%';
"^"				return '^';

{var}			return 'VAR';
{num}			return 'NUM';
{ws}			/* */
\r\n			return 'END';
\n				return 'END';
\r				return 'END';
<<EOF>>			return 'EOF';

/lex

%left '||'
%left '&&'
%left '<' '>' '<=' '>=' '==' '<>'
%left '+' '-'
%left '*' '/' '%'
%right "^"
%left UMINUS

%start start

%%

start
	: expressions EOF												{ return $1;}
	;

expressions
	: expression													{ $$ = new yy.Expressions($1); }
	| expressions expression										{ $$ = new yy.Expressions($1, $2);}
	;

expression
	: VAR '=' e														{ $$ = new yy.Assignment($1, $3); }
	| IF LPAREN le RPAREN THEN expressions ENDIF					{ $$ = new yy.Conditional($3, $6); }
	| IF LPAREN le RPAREN THEN expressions ELSE expressions ENDIF	{ $$ = new yy.Conditional($3, $6, $8); }
	;

le
	: e '<' e														{ $$ = new yy.LogicalExpression($1, $2, $3); }
	| e '>' e														{ $$ = new yy.LogicalExpression($1, $2, $3); }
	| e '<=' e														{ $$ = new yy.LogicalExpression($1, $2, $3); }
	| e '>=' e														{ $$ = new yy.LogicalExpression($1, $2, $3); }
	| e '<>' e														{ $$ = new yy.LogicalExpression($1, $2, $3); }
	| e '==' e														{ $$ = new yy.LogicalExpression($1, $2, $3); }
	| le '&&' le													{ $$ = new yy.LogicalExpression($1, $2, $3); }
	| le '||' le													{ $$ = new yy.LogicalExpression($1, $2, $3); }
	;

e
	: e '+' e														{ $$ = new yy.MathExpression($1, $2, $3); }
	| e '-' e														{ $$ = new yy.MathExpression($1, $2, $3); }
	| e '*' e														{ $$ = new yy.MathExpression($1, $2, $3); }
	| e '/' e														{ $$ = new yy.MathExpression($1, $2, $3); }
	| e '%' e														{ $$ = new yy.MathExpression($1, $2, $3); }
	| e '^' e														{ $$ = new yy.MathExpression($1, $2, $3); }
	| '-' e %prec UMINUS											{ $$ = new yy.UnaryOperator($1, $2); }
	| LPAREN e RPAREN												{ $$ = new yy.ParenExpression($2); }
	| NUM															{ $$ = new yy.Value(Number(yytext)); }
	| VAR															{ $$ = new yy.Variable(yytext); }
	;

end
	: END
	| end END
	;

%%