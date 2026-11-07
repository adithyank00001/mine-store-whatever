css = open(r'C:\Users\user\Desktop\ecom\kids ecom\src\components\store\products\kids-kosha\kids-kosha.css').read()

import re

for sel, body in re.findall(r'([^\{\}]+)\{([^\{\}]+)\}', css):
    if any(k in sel for k in ['grid-container', 'inside-article', 'site', 'entry-content', 'container']):
        if any(p in body for p in ['width', 'padding', 'margin', 'max-width']):
            print(sel.strip(), '==>', body.strip()[:100])

