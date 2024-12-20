---
title: "「Python」异常处理"
date: 2024-09-02T13:28:48+08:00
categories: ['Docs']
author: "Ronan"
---
在 Python 中，常见的基本错误有两类，即语法错误和异常。对于语法错误，应该在程序编写过程中尽量予以避免，在程序调试中消除。而异常是 Python 程序在运行过程中引发的错误，如果程序中引发了未进行处理的异常，程序就会由于异常而终止运行，只有为程序添加异常处理，才能使程序更具健壮性。

# 1.语法错误

语法错误是所有编程语言中都存在的一种常见错误，即程序的洗发不符合编程语言的规定。常见的语法错误有：

1. 拼写错误（SyntaxError、NameError），即 Python 语言中的关键字写错，变量名，函数名拼写错误等。
2. 脚本程序不符合 Python 的语法规范，例如少了括号，冒号等，以及表达式书写错误等。
3. 缩进错误，因为 Python 语法规定，以缩进作为程序的语法之一。一般来说，Python 标准的缩进是以 4 个空格或一个 Tab 作为一个缩进，但同一个程序或项目中应该统一使用同一种缩进风格。



# 2.异常处理

异常是 Python 程序在运行过程中引发的错误。如果程序中引发了未进行处理的异常，脚本就会由于异常而终止运行。只有在程序中捕获这些异常，并进行相关的处理，才能使程序不会中断运行。

Python 中使用 `try...except` 语句来说处理异常，基本形式如下：

```python
try:
	'语句'	 # 可能产生异常的语句
except	'异常名 1'：	# 要处理的第一类异常
	'语句'	 # 异常的处理语句
except	'异常名 1'：	# 要处理的第二类异常
	'语句'	 # 异常的处理语句
else:		  
	'语句'     # 未触发异常，则执行该语句
finally:	  
	'语句'     # 始终执行该语句，一般为了达到释放资源等目的
```

注意：else 语句在未引发异常情况下得到运行。



首先，我们先演示一个最简单的案例：

```python
# 函数名错误, print 误写成 printt
printt(1)
print(2)
```

运行结果：

```text
NameError: name 'printt' is not defined
```

使用异常捕获

```python
try:
    # 函数名错误, print 误写成 printt
    printt(1)
except:
    print('捕获到了异常')

print(2)
```

注意：

在这里如果你把 print(2) 放到 try 里面，依然不执行，因为在 try语句块中，捕获到了异常，直接进入了 except 的异常语句块。

如果没有引发错误，可以使用 else 关键字来定义要执行的代码块：

```python
try:
    # 函数名错误, print 误写成 printt
    printt(1)
except:
    print('捕获到了异常')
else:
    print('未发现异常')

print(2)
```

如果指定了 finally 块，则无论 try 块是否引发错误，都会执行 finally 块。

```python
try:
    # 函数名错误, print 误写成 printt
    printt(1)
except:
    print('捕获到了异常')
else:
    print('未发现异常')
finally:
    print('try内容执行完毕')

print(2)

try:
    # 函数名错误, print 误写成 printt
    print(1)
except:
    print('捕获到了异常')
else:
    print('未发现异常')
finally:
    print('try内容执行完毕')
```



# 3.Python 主要的内置异常及其处理

在 Python 中常见的异常都已经预定义好了，

|      异常名       |                 描述                 |
| :---------------: | :----------------------------------: |
|  AttributeError   |      调用不存在的方法引发的异常      |
|     EOFError      |        遇到文件末尾引发的异常        |
|    ImportError    |        导入模块出错引发的异常        |
|    IndexError     |          列表越界引发的异常          |
|      IOErro       | I/O 操作引发的异常，如打开文件出错等 |
|     KeyError      |  使用字典中不存在的关键字引发的异常  |
|     NameError     |     使用不存在的变量名引发的异常     |
|     TabError      |      语句块缩进不正确引发的异常      |
|    ValueError     |    搜索列表中不存在的值引发的异常    |
| ZeroDivisionError |          除数为零引发的异常          |

except 语句主要有以下几种用法：

|                    语法                     |                 说明                 |
| :-----------------------------------------: | :----------------------------------: |
|                   except                    |             捕获所有异常             |
|               except '异常名'               |             捕获指定异常             |
|       except ('异常名 1'，'异常名 2')       |       捕获指定异常名1或异常名2       |
|         except '异常名' as '替代值'         |     捕获指定异常并用'替代值'代替     |
| except ('异常名 1'，'异常名 2') as '替代值' | 捕获异常名1或异常名2并用'替代值'代替 |



# 4.手动抛出异常

## 4.1. raise 语句

上一小节中，所有的异常都是在程序运行中出现了错误而引发的异常，我们还可以在 Python 程序中使用 raise 语句来引发指定的异常，并向异常传递数据。

为了程序的需要，程序员还可以自定义新的异常类型，例如要求用户输入文本的长度有要求，则可以用 raise 引发异常，以确保文本输入的长度符合要求。

raise 的使用方式：

- raise 异常名
- raise 异常名，附加数据
- raise 类名

使用 raise 可以抛出各种预定异常，即使程序在运行时根本不会引发该异常。

示例：

```python
# 要求用户输入名字不超过 10 个字符
name = input('请输入你的名字，不超过 10 个字：')

if len(name) > 10:
    raise NameError
else:
    print(name)
print('程序执行结束')
```

我们使用 raise 抛出异常，同时捕获异常，因此程序运行不会中断。

```python
try:
    # 要求用户输入名字不超过 10 个字符
    name = input('请输入你的名字，不超过 10 个字：')

    if len(name) > 10:
        raise NameError
    else:
        print(name)
except NameError:
    print('捕获了一个NameError')
    
print('程序执行结束')
```

## 4.2. assert 语句

assert 语句的一般形式如下：

```text
assert '条件测试'，'异常附加数据'		# 其中异常附加数据是可选的
```

assert 语句是简化的 raise 语句，它引发异常的前提是其后面的条件测试为假。

示例：

```python
# 要求用户输入名字不超过 10 个字符
name = input('请输入你的名字，不超过 10 个字：')

assert len(name) < 10
print('程序执行结束')
```

assert 语句一般用于在程序开发时测试代码的有效性。比如某个变量值必须在一定范围内，而运行时得不到的值不符合要求，则引发该异常，对开发者予以提示。所以一般在程序开发中，不去捕获这个异常，而是让他中断程序。原因是这个程序中已经出现了问题，不应该继续运行。



# 5. 自定义异常类

在 Python 中定义异常类不用从基础完全自己定义，只要通过继承 Exception 类来创建自己的异常类。异常类的定义和其他类没有区别，最简单的自定义异常类甚至可以只继承 Exception 类，类体为 pass 如：

```python
class MyError(Exception):	# 继承Exception类
    pass
```

如果需要异常类带有一定的提示信息，也可以重载 `__str__` 和 `__init__` 这两个方法。

示例：

```python
class LengthError(Exception):

    def __init__(self):
        self.value = '名字过长'

    def __str__(self):
        return self.value


try:
    # 要求用户输入名字不超过 10 个字符
    name = input('请输入你的名字，不超过 10 个字：')

    if len(name) > 10:
        raise LengthError
    else:
        print(name)
except LengthError:
    print('捕获了一个LengthError')

print('程序执行结束')
```