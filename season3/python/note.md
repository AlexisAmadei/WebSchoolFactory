# Notes Python
## List
- Return and remove indexed element: `list.pop([index])`
- Add element at the end of the end of the list : `list.append([index])`
- Access element in reverse order `list[-index]`
- Copy list content `l1 = l2.copy()` **!=** `l1 = l2` (copie du pointeur de l'obj. Les 2 sont liés)
## String
- Concat: `'abc' + 'def' = 'abcdef'`
- Concat the same twice: `'abc' * 2 = 'abcabc'`
## Condition
- `x = 1 if [condition] else 2`
## Tuples
- Constant vector like: `tuple = (x, y)`
- Join two tuples in list: `tuple = zip(t1[a,b], t2[c,d]) = [(a, b), (c, d)]`
## Dico
- Create dict: ``dico['key'] = 'value' = {'key': 'value'}
- Loop throught dico: `for key, value in dico.items():`