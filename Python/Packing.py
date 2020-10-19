def subset(T, L):
    if T == 0:
        return True
    elif len(L) == 0:
        return False
    if subset(T-L[0],L[1:]):
        return True
    return subset(T, L[1:])

print(subset(12, [2, 3, 4, 7, 10, 42]))
print(subset(8, [2, 3, 4, 7, 10, 42]))