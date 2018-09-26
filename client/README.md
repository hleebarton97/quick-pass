(https://github.com/hleebarton97/quick-pass/blob/master/client/src/img/QuickPass.png "Qu1ck P@ss Logo")

# Psuedo-random Cryptographic Password Generator

Insipired by [ Gibson's GRC Password Generator ](https://www.grc.com/passwords.htm)

At each page refresh, or click of a button, 3 types
of 64 random characters are generated: 64 random
hexadecimal characters, 64 random ASCII characters,
and then 64 random alpha-numeric characters. I kind
of cheat and use the new window.crypto function
'getRandomValues( )'. However, when I generated these
passwords on the server, I specify a size of a
UInt8Array array and create an array half the size
by randomly selecting positions in the original array
and filling up the new array with those values, while
not repeating the position. I then return the array
and create an object based on the 3 stringified
versions of the psuedo-random values in the arrays.

## Site
