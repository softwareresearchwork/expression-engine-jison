%lex

num  		[0-9]+("."[0-9]+)?\b
ws			\s+

%%

\n			return 'END'
"//".*		return 'COMMENT';
{ws}		/* space */
"("			return 'LPAREN';
")"			return 'RPAREN';
"+"			return '+';
"-"			return '-';
"*"			return '*';
"Pie"		return 'PI';
"begin"		return 'BEGIN';
"math"		return 'MATHBLOCK';		
"end"		return 'END';
{num}		return 'NUM';
<<EOF>>		return 'EOF';


/lex

%left '-'
%left '*'
%left "+"

%start pgm
%%

pgm
		:						/* white space */
		| pgm comment			/**/
		| pgm block				{ ary.push($2); }
		| pgm eof				{ console.log(ary.join("<>")); }
		;

comment
		: COMMENT end
		;

block
		: MATHBLOCK e end				{ $$= $2 }
		;

begin
		: BEGIN
		;
		
e
		: NUM					{ $$ = Number($$) }
		| '-' e %prec UMINUS	{ $$ = -$1 }
		| LPAREN e RPAREN		{ $$ = Math.abs($2) }
		| e '*' e				{ $$ = $1 * $3 }
		| '+' e	e				{ $$ = $2 + $3 }
		| PI					{ $$ = Math.PI }
		;

end
		: END
		| end END
		;

eof
		: EOF
		;

%%

ary = [];