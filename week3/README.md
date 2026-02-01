# Weather MCP Server

一个基于Model Context Protocol (MCP)的天气服务服务器，包装了OpenWeatherMap API，提供实时天气和天气预报功能。

## 项目概述

本项目实现了一个MCP服务器，具有以下特性：

- 支持两种部署模式：
  - **STDIO模式**：本地运行，可与Claude Desktop等MCP客户端集成
  - **HTTP模式**：远程运行，可通过网络访问
- 提供两个MCP工具：
  - `get_current_weather`：获取指定位置的当前天气
  - `get_weather_forecast`：获取指定位置的5天天气预报
- 健壮的错误处理：处理API失败、超时和空结果
- API速率限制感知
- 支持多种温度单位（公制、英制、标准）

## 快速开始

### 先决条件

- Python 3.7+
- OpenWeatherMap API密钥（[免费注册获取](https://openweathermap.org/api)）

### 安装

1. 克隆或进入项目目录：

```bash
cd week3
```

2. 安装依赖：

```bash
pip install -r requirements.txt
```

### 配置

1. 创建 `.env` 文件并添加OpenWeatherMap API密钥：

```bash
# .env
OPENWEATHERMAP_API_KEY=your_api_key_here
```

## 运行服务器

### 本地运行（STDIO模式）

```bash
python server/main.py --mode stdio
```

服务器启动后，MCP客户端（如Claude Desktop）应该能够自动发现并连接到它。

### 远程运行（HTTP模式）

```bash
python server/main.py --mode http --host 127.0.0.1 --port 8000
```

服务器将在 `http://127.0.0.1:8000` 上可用。

## 工具参考

### 1. get_current_weather

获取指定位置的当前天气。

**参数**：
- `location` (必需)：位置名称（例如："北京, CN"）
- `units` (可选)：温度单位，可选值：`metric`（默认，摄氏度）、`imperial`（华氏度）、`standard`（开尔文）

**返回值**：
```json
{
  "location": "Beijing, CN",
  "temperature": 23.5,
  "description": "晴",
  "humidity": 45,
  "wind_speed": 5.2,
  "icon": "01d",
  "timestamp": "2026-02-01T12:00:00"
}
```

### 2. get_weather_forecast

获取指定位置的5天天气预报。

**参数**：
- `location` (必需)：位置名称（例如："上海, CN"）
- `units` (可选)：温度单位，可选值：`metric`（默认，摄氏度）、`imperial`（华氏度）、`standard`（开尔文）

**返回值**：
```json
{
  "location": "Shanghai, CN",
  "forecast": [
    {
      "date": "2026-02-01",
      "temperature": 22.0,
      "description": "多云",
      "humidity": 50,
      "wind_speed": 4.5,
      "icon": "02d"
    },
    // 更多4天的预报...
  ],
  "timestamp": "2026-02-01T12:00:00"
}
```

## 示例用法

### 在Claude Desktop中使用（STDIO模式）

1. 启动服务器：
```bash
python server/main.py --mode stdio
```

2. 可以通过TRAE IDE集成MCP服务。json格式如下
```
{
  "mcpServers": {
    "weather-mcp-server": {
      "command": "python",
      "args": [
        "xxx\\server\\main.py"
      ]
    }
  }
}
```

### 通过HTTP请求使用（HTTP模式）

1. 启动服务器：
```bash
python server/main.py --mode http
```

2. 使用test_openai_sdk.py测试
```bash
python test_openai_sdk.py
```

## 故障排除

### 常见错误

1. **API密钥错误**：
   - 错误信息：`Error: OPENWEATHERMAP_API_KEY not set in environment variables`
   - 解决方法：确保已在`.env`文件中设置了正确的OpenWeatherMap API密钥

2. **位置未找到**：
   - 错误信息：`{"error": "Location not found"}`
   - 解决方法：确保提供的位置名称格式正确，例如："城市名, 国家代码"

3. **API速率限制**：
   - 错误信息：`{"error": "API rate limit exceeded"}`
   - 解决方法：等待一段时间后再尝试，或考虑升级OpenWeatherMap API计划

4. **连接错误**：
   - 错误信息：`{"error": "Connection error"}`
   - 解决方法：检查网络连接是否正常

5. **请求超时**：
   - 错误信息：`{"error": "Request timeout"}`
   - 解决方法：检查网络连接，或稍后再尝试

### 调试

- 运行服务器时，控制台会显示启动信息和错误日志
- 对于HTTP模式，可以通过浏览器访问服务器URL查看基本信息

## 依赖项

- **fastmcp**：MCP服务器实现
- **requests**：用于调用OpenWeatherMap API
- **python-dotenv**：用于加载环境变量

## 项目结构

```
week3/
├── server/
│   ├── main.py         # MCP服务器实现
│   ├── weather_client.py # OpenWeatherMap API客户端
│   └── __init__.py
├── README.md           # 项目文档
├── assignment.md       # 作业要求
├── design_doc_mcp.md   # 设计文档
├── requirements.txt    # 依赖项
├── test_openai_sdk.py  # 测试文件
└── test_weather_client.py # 测试文件
```

## 许可证

MIT
