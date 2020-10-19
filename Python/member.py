def Check(T, L):
    if T == L[0]:
        return True
    elif T != L[0] and len(L) > 1:
        return Check(T,L[1:])
    else:
        return False



print(Check(42, [1, 3, 5, 7]))