def reverse(L):
    if len(L) == 0:
       return []
    if type(L[0]) == type([]):
        L[0] = reverse(L[0])
    return (reverse(L[1:])+[L[0]])
print(reverse([1, [2, [4, 5], 6], 7]))