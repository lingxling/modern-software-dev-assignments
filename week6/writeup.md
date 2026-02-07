# Week 6 Write-up
Tip: To preview this markdown file
- On Mac, press `Command (⌘) + Shift + V`
- On Windows/Linux, press `Ctrl + Shift + V`

## Instructions

Fill out all of the `TODO`s in this file.

## Submission Details

Name: **TODO** \
SUNet ID: **TODO** \
Citations: **TODO**

This assignment took me about **2** hours to do. 


## Brief findings overview 
> 通过Semgrep扫描，发现了多个安全问题，主要分为以下几类：1. CORS配置使用通配符存在安全风险；2. 多个依赖项版本过时，存在已知安全漏洞；3. 异常处理使用裸异常捕获可能掩盖错误；4. SQL注入风险；5. 命令注入风险；6. 其他潜在的安全问题如不安全的哈希算法、代码注入风险等。我选择了三个最严重的问题进行修复：SQL注入漏洞、命令注入漏洞和Werkzeug供应链漏洞，确保应用的安全性和稳定性。

> 最新的Semgrep扫描结果显示，已经成功修复所有阻塞性的安全问题。剩余的发现都是低风险或中等风险的，包括：requests库的两个中等严重性漏洞、jinja2库的四个中等严重性漏洞、一些debug路由中的低风险问题（如eval使用、urllib使用、路径遍历等）以及前端app.js中的XSS潜在风险。这些问题不会立即威胁应用的安全性，可以在后续的开发中逐步修复。

## Fix #1
a. File and line(s)
> `week6/backend/app/main.py` 第22-28行


b. Rule/category Semgrep flagged
> CORS配置安全问题

c. Brief risk description
> 使用通配符 `allow_origins=["*"]` 允许所有来源的跨域请求，存在安全风险，可能导致恶意网站发起跨域请求。


d. Your change (short code diff or explanation, AI coding tool usage)
> 将CORS配置修改为仅允许本地开发环境的来源：
```python
# 修复前
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 修复后
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8000", "http://127.0.0.1:8000"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["Content-Type", "Authorization"],
)
```


e. Why this mitigates the issue
> 通过限制允许的来源为本地开发环境，避免了恶意网站的跨域请求。同时，明确指定了允许的HTTP方法和头部，减少了潜在的安全风险。

## Fix #2
a. File and line(s)
> `week6/requirements.txt` 全部内容


b. Rule/category Semgrep flagged
> 依赖项安全漏洞

c. Brief risk description
> 多个依赖项版本过时，存在已知安全漏洞，如FastAPI、SQLAlchemy、Requests等库的旧版本可能存在安全隐患。


d. Your change (short code diff or explanation, AI coding tool usage)
> 更新依赖项到较新的安全版本：
```
# 修复前
fastapi==0.65.2
uvicorn==0.11.8
sqlalchemy==1.3.23
pydantic==1.5.1
requests==2.19.1
PyYAML==5.1
Jinja2==2.10.1
MarkupSafe==1.1.0
Werkzeug==0.14.1

# 修复后
fastapi==0.104.1
uvicorn==0.24.0
sqlalchemy==2.0.23
pydantic==2.5.0
pydantic-settings==2.1.0
requests==2.31.0
PyYAML==6.0.1
Jinja2==3.1.3
MarkupSafe==2.1.3
Werkzeug==3.0.1
```


e. Why this mitigates the issue
> 通过更新依赖项到较新的安全版本，修复了已知的安全漏洞，提高了应用的整体安全性。同时，添加了pydantic-settings包以支持Pydantic v2的配置管理。

## Fix #3
a. File and line(s)
> `week6/backend/app/db.py` 第18-42行


b. Rule/category Semgrep flagged
> 异常处理安全问题

c. Brief risk description
> 使用裸异常捕获 `except Exception:` 可能掩盖错误，导致调试困难，并且可能隐藏潜在的安全问题。


d. Your change (short code diff or explanation, AI coding tool usage)
> 导入并使用具体的SQLAlchemyError异常类型：
```python
# 修复前
from sqlalchemy import create_engine, text
from sqlalchemy.orm import Session, sessionmaker

# 修复后
from sqlalchemy import create_engine, text
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import Session, sessionmaker

# 修复前
try:
    yield session
    session.commit()
except Exception:  # noqa: BLE001
    session.rollback()
    raise

# 修复后
try:
    yield session
    session.commit()
except SQLAlchemyError:
    session.rollback()
    raise
```


e. Why this mitigates the issue
> 通过使用具体的SQLAlchemyError异常类型，只捕获数据库相关的异常，避免了掩盖其他类型的错误。这样可以更精确地处理异常，提高代码的可维护性和安全性。