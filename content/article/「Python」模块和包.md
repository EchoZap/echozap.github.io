---
title: "「Python」模块和包"
date: 2024-09-02T13:29:19+08:00
categories: ['Docs']
author: "Ronan"
---
Python 提供了强大的模块支持，主要体现在，不仅 Python 标准库中包含了大量的模块（称为标准模块），还有大量的第三方模块，开发者自己也可以开发自定义模块。通过这些强大的模块可以极大地提高开发者的开发效率。

那么，模块到底指的是什么呢？Python 模块(Module)，是一个 Python 文件，以 .py 结尾，也就是 Python 程序的后缀名。 模块能定义函数，类和变量，模块里也能包含可执行的代码。用作模块的程序与其他的程序并没有什么区别。

**模块的作用**: python中有很多各种不同的模块, 每一个模块都可以帮助我们快速的实现一些功能, 比如实现与数学相关的功能就可以使用 math 模块，我们可以这样理解，每个变量，函数，类都是一个工具，而模块则是一个工具箱，里面可以放很多工具。当我们想要使用某个工具的时候，我们不需要现场制造（写新的代码），只需要拿出来含有相对应工具的工具箱即可（导入相对应的模块）。

# 1. 模块的导入方式

在 Python 中，模块使用前需要先导入，导入语法如下：

```python
# 将整个模块导入
import 模块名
# 将整个模块导入，并且在程序中用别名代替模块名
import 模块名 as 别名
# 导入模块名中的某个类，变量，方法
from 模块名 import 类，变量，方法等
# 导入整个模块
from 模块名 import *
# 导入模块的某个功能，并用别名替代功能名
from 模块名 import 功能名 as 别名
```

注意：`import 模块名/import 模块名 as 别名` 与 `from 模块名 import *` 使用区别的。使用 import 的导入模块，在使用模块中的功能时，必须以`模块名.功能名`的形式调用。

使用 `as 别名` 来导入时，给模块重新命名一个名字，可能是因为防止名称重复，也可能是为了方便书写。

以导入并使用 math 模块为例：

```python
# 使用 import 语句导入 math 模块
import math

# 使用 math 模块中的π的值，
print(math.pi)
# 使用 math 函数中的 三角函数
print(math.sin(math.pi / 2))


# 使用 mport 模块名 as 别名,导入 math 模块
import math as m

print(m.pi)
print(m.sin(m.pi / 2))


# 使用 from 模块名 import * 导入 math 模块
from math import *

print(pi)
print(sin(pi / 2))


# 使用 from 模块名 import 类，变量，方法等
from math import pi, sin

print(pi)
print(sin(pi / 2))

# 使用 from 模块名 import 功能名 as 别名
from math import pi as pai
from math import sin as sine

print(pai)
print(sine(pai / 2))
```

# 2. 自定义模块

Python 中已经帮我们实现了很多模块，但是有些时候，我们还需要一些个性化的模块，这时就可以通过自定义模块实现。

自己编写的模块其实和平常写 Python 程序是相同的，他既可以是一个解决某个问题的独立程序，也可以是几个函数构成。而模块名就是代码保存的文件名。

示例

```python
# 创建一个 .py 文件，命名为 my_module

# 定义一个变量 
test_name = '自定义模块测试变量名'

# 定义一个函数
def test_function():
    print('自定义模块测试函数')
```

然后，在同一路径下的另一个文件中导入该模块

```python
import my_module

print(my_module.test_name)
my_module.test_function()
```

注意：当导入多个模块的时候，且模块内有同名功能，当调用这个同名功能的时候，调用到的是后面导入的模块的功能。

示例：

```python
# 模块1
def test_a():
    print('module_1中的test_a函数')
```

```python
# 模块2
def test_a():
    print('module_2中的test_a函数')
```

```python
from module_1 import test_a

test_a()

from module_2 import test_a

test_a()
```

### 2.1. 模块位置

编写好的模块只有被 Python 找到才能导入。上面的示例因为编写的模块与调用模块的程序位于同一目录中，因此不需要进行设置就能被 Python 找到并导入。如果在该目录下新建一个 module 目录，并且把 my_module.py 剪切至 module 中，继续使用上述代码就会报错 ImportError，找不到要导入的模块。

ImportError 表示：Python解释器没有找到 my_module 模块。在导入模块时，Python 解释器首先在当前目录中查找要导入的模块。如果没有找到，会从 sys 模块中的 path 变量指定的目录查找导入模块。如果依然没有找到，则会引发 ImportError 错误。

一般来说，Python 解释器在运行程序前将当前目录添加到 sys.path 路径列表中，所以导入模块时首先查找的路径是当前目录下的模块。

因此，你可以将自定义模块的路径添加到 sys.path 中，然后使用 import。

用法：

```python
import sys	# 导入 sys 模块

print(sys.path)		# 输出当前模块查找路径
sys.path.append('自定义模块路径')	# 添加自定义模块路径为模块查找路径
```

示例：

```python
import sys	# 导入 sys 模块

print(sys.path)		# 输出当前模块查找路径
sys.path.append(r"D:\PythonBasisTutorial\module")

import my_module

print(my_module.test_name)
my_module.test_function()
```

实际上这种方法并不常用，因为不符合 Python 的代码规范，在 Python 代码规范中，import 语句要求放在程序开始，但是如果你不添加到 sys.path，你就无法引入 my_module 模块。而且，如果有多个文件需要引入时，你无法确定你是否已经将自定义模块添加到 sys.path 中。

因此，还有一种更简单通用的写法，`同级目录名.模块名`：

```python
from module import my_module

print(my_module.test_name)
my_module.test_function()

# 或者
import module.my_module

print(module.my_module.test_name)
module.my_module.test_function()
```

此时的目录名，我们也称之为**包**。

### 2.2. __all__

如果一个模块文件中有 `__all__` 变量时，导入时，只能导入这个列表中的元素。

示例：

```python
# my_module 模块
__all__ = ['test_function', 'test_name', 'test_a']

# 定义一个变量
test_name = '自定义模块测试变量名'


# 定义一个函数
def test_function():
    print('自定义模块测试函数')


def test_a():
    print('my_module中的test_a函数')


def test_b():
    print('my_module中的test_b函数')
```

```python
from my_module import *

test_a()
test_b()
```

运行结果

```
my_module中的test_a函数
Traceback (most recent call last):
  File "D:/PythonBasisTutorial/Chapter1.py", line 4, in <module>
    test_b()
NameError: name 'test_b' is not defined
```

### 2.3. 具有独立运行能力的模块

每个 Python 程序在运行时都有一个 `__name__` 属性。在程序中通过对 `__name__` 属性值的判断，可以让程序在作为导入模块和独立运行时都可以正确运行。

在 Python 中，如果程序作为模块导入，则其 `__name__` 属性被设置为模块名。如果程序独立运行，则其 `__name__` 属性被设置为 `__main__`。因此，可以通过 `__name__` 属性来判断程序的运行状态。

对上段代码进行修改，使它既可以独立运行，又可以作为模块被其他程序导入使用，修改后代码如下：

```python
__all__ = ['test_function', 'test_name', 'test_a']

# 定义一个变量
test_name = '自定义模块测试变量名'


# 定义一个函数
def test_function():
    print('自定义模块测试函数')


def test_a():
    print('my_module中的test_a函数')


def test_b():
    print('my_module中的test_b函数')


if __name__ == '__main__':
    test_a()
```

一般来说，将模块的主要功能以实例的形式放在这个 if 语句中，可以方便测试模块是否正常运行，或者发现模块的错误。这是一个好习惯。

# 3. 包

当应用程序或项目具有较多的功能模块时，如果把他们都放在同一个文件夹下，就显得不合理了，这时，可以使用 Python 中提供的包来管理较多的功能模块。使用包的好处在于可以有效避免名字冲突，便于包的维护管理。

### 3.1. 自定义包

包其实就是一个文件夹或目录，但其中必须包含一个名为 `__init__.py`(init 的前后均是两条下划线)的文件。`__init__.py` 可以是一个空文件，仅用于表示该目录是一个包。此外，包还可以嵌套，即把子包放在某个包中。包可以看做处于同一目录中的模块。在 Python 中 首先使用目录名，然后使用模块名导入需要的模块。

使用如下：

- 新建包 `my_package`
- 新建包内模块：`my_module_1` 和 `my_module_2`，并添加功能

示例：

```python
from my_packages import my_module_1, my_module_2

my_module_1.print_info_1()
my_module_2.print_info_2()
```

如果我们想要控制允许用户导入的模块列表，就需要在 `__init__.py` 文件中添加 `__all__ = []`。

示例，如果我们在 my_packages 的 `__init__.py` 中添加

```python
__all__ = ['my_module_1']
```

我们再调用

```python
from my_packages import *

my_module_1.print_info_1()
my_module_2.print_info_2()
```

运行结果：

```
NameError: name 'my_module_2' is not define
```

注意：__all__针对的是 `from ... import *` 这种方式对 `import xxx` 这种方式无效。例如：

```
from my_packages import my_module_2, my_module_1

my_module_1.print_info_1()
my_module_2.print_info_2()
```

依然可以正常使用。

### 3.2. 第三方包

在Python程序的生态中，有许多非常多的第三方包（非Python官方），可以极大的帮助我们提高开发效率，  

- 科学计算中常用的：numpy包
- 数据分析中常用的：pandas包
- Web开发常用的包：Django, Flask, Fast-API
- 游戏开发常用的包：PyGame
- 人工智能包：TensorFlow

这些第三方的包，极大的丰富了Python的生态，提高了开发效率。   
但是由于是第三方，所以Python没有内置，所以我们需要安装它们才可以导入使用哦。  
第三方包的安装非常简单，我们只需要使用Python内置的pip程序即可。  
打开我们许久未见的：命令提示符程序，在里面输入：

```
pip install '包名称==版本号'
```

注意：版本号与双等号可以省略不写，默认安装最新版

由于pip是连接的国外的网站进行包的下载，所以有的时候会速度很慢。

我们可以通过如下命令，让其连接国内的网站进行包的安装：

```
pip install -i https://pypi.douban.com/simple/ `包名称==版本号`
```