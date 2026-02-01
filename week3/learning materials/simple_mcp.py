from pathlib import Path
from typing import Any, Dict, List
from fastmcp import FastMCP

mcp = FastMCP(name="SimpleMCPTestServer")


def resolve_abs_path(path_str: str) -> Path:
    """
    file.py -> /Users/home/mihail/modern-software-dev-lectures/file.py
    """
    path = Path(path_str).expanduser()
    if not path.is_absolute():
        path = (Path.cwd() / path).resolve()
    return path

@mcp.tool
def read_file_tool(filename: str) -> Dict[str, Any]:
    """
    Gets the full content of a file provided by the user.
    :param filename: The name of the file to read.
    :return: The full content of the file.
    """
    full_path = resolve_abs_path(filename)
    print(full_path)
    
    try:
        # 检查文件是否存在
        if not full_path.exists():
            return {
                "file_path": str(full_path),
                "error": "File does not exist"
            }
        
        # 检查是否是文件（不是目录）
        if not full_path.is_file():
            return {
                "file_path": str(full_path),
                "error": "Path is not a file"
            }
        
        # 使用UTF-8编码读取文件，处理编码问题
        with open(str(full_path), "r", encoding="utf-8") as f:
            content = f.read()
        
        return {
            "file_path": str(full_path),
            "content": content
        }
    except PermissionError:
        return {
            "file_path": str(full_path),
            "error": "Permission denied"
        }
    except Exception as e:
        return {
            "file_path": str(full_path),
            "error": f"Error reading file: {str(e)}"
        }

@mcp.tool
def list_files_tool(path: str) -> Dict[str, Any]:
    """
    Lists the files in a directory provided by the user.
    :param path: The path to the directory to list files from.
    :return: A list of files in the directory.
    """
    full_path = resolve_abs_path(path)
    
    try:
        # 检查路径是否存在
        if not full_path.exists():
            return {
                "path": str(full_path),
                "error": "Directory does not exist"
            }
        
        # 检查是否是目录
        if not full_path.is_dir():
            return {
                "path": str(full_path),
                "error": "Path is not a directory"
            }
        
        all_files = []
        for item in full_path.iterdir():
            all_files.append({
                "filename": item.name,
                "type": "file" if item.is_file() else "dir"
            })
        
        return {
            "path": str(full_path),
            "files": all_files
        }
    except PermissionError:
        return {
            "path": str(full_path),
            "error": "Permission denied"
        }
    except Exception as e:
        return {
            "path": str(full_path),
            "error": f"Error listing files: {str(e)}"
        }

@mcp.tool
def edit_file_tool(path: str, old_str: str, new_str: str) -> Dict[str, Any]:
    """
    Replaces first occurrence of old_str with new_str in file. If old_str is empty, creates/overwrites file with new_str.
    :param path: The path to the file to edit.
    :param old_str: The string to replace.
    :param new_str: The string to replace with.
    :return: A dictionary with the path to the file and the action taken.
    """
    full_path = resolve_abs_path(path)
    p = Path(full_path)
    
    try:
        if old_str == "":
            # 创建或覆盖文件
            # 确保目录存在
            if not p.parent.exists():
                try:
                    p.parent.mkdir(parents=True, exist_ok=True)
                except Exception as e:
                    return {
                        "path": str(full_path),
                        "error": f"Error creating directory: {str(e)}"
                    }
            
            p.write_text(new_str, encoding="utf-8")
            return {
                "path": str(full_path),
                "action": "created_file"
            }
        
        # 检查文件是否存在
        if not p.exists():
            return {
                "path": str(full_path),
                "error": "File does not exist"
            }
        
        # 检查是否是文件
        if not p.is_file():
            return {
                "path": str(full_path),
                "error": "Path is not a file"
            }
        
        original = p.read_text(encoding="utf-8")
        if original.find(old_str) == -1:
            return {
                "path": str(full_path),
                "action": "old_str not found"
            }
        
        edited = original.replace(old_str, new_str, 1)
        p.write_text(edited, encoding="utf-8")
        return {
            "path": str(full_path),
            "action": "edited"
        }
    except PermissionError:
        return {
            "path": str(full_path),
            "error": "Permission denied"
        }
    except Exception as e:
        return {
            "path": str(full_path),
            "error": f"Error editing file: {str(e)}"
        }

if __name__ == "__main__":
    mcp.run()