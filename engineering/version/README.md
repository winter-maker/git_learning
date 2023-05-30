
配置 user 信息,user.name 和 user.email， git 的最小配置
git config --global user.name 'lyjlw'
git config --global user.email '9852@qq.com'
--local 对当前用户当前仓库有效,优先级大于global
--global 对当前用户所有仓库都有效
--system 对系统所有登录仓库有效，基本不用

建 git 仓库
两种场景
1、把已有的项目代码纳入git管理
 cd 项目代码所在文件夹
 git init
2、新建的项目直接用 git 管理
 cd 某个文件夹
 git init your_project
 cd your_project



git add files 把文件添加到暂存区
git add . 把所有的文件添加到暂存区
git add -u 把修改的文件添加到暂存区
git status 查看文件状态
git commit -m "message" 把文件添加到版本历史中
git rm files 删除暂存区文件
git mv index index2 index文件重命名

git restore 本地回退
git commit -am '' 添加到版本库
git stash 添加修改文件到存放起来
git stash list 查看存放的文件
git stash pop 弹出存放的文件，会删除存放的表
git stash apply 弹出存放的文件，不会删除存放的表
git log 查看当前分支的日志
git -n2 查看最近2次的日志
git log --oneline 简短的形式显示Log
git log --all 查看所有分支的日志
git log --all -n4 查看所有分支就近4个的日志
git log --all -n4 --oneline 查看所有分支就近4个的日志,一行显示
git log --all --graph 图形化查看所有分支的日志
git help log 查看所有log 的用法
gitk 弹出图形化工具
gitk --all

.gitignore 文件配置不上传到远程
doc/


探秘 .git 文件夹
.git/HEAD 记录了refs 的指向
.git/config 记录了 git config 配置的信息
.git/refs 记录了 heads 分支和 tags 里程碑
.git/refs/master 记录了分支指向哪个commit
.git/refs/tags 记录了里程碑
.git/objects git 的核心文件
git 中有三个对象commit, tree, blob
commit 一个commit对应一颗树，对应一个视图，视图里面存放一个快照。快照集合里面放了当前commit对应的项目下所有文件夹和文件。文件夹长什么样，文件长什么样，通过这个树呈现出来的。
tree 文件夹
blob文件


分离头指针
变更没有基于branch,当分支切换时变更很可能变成垃圾清除掉
git checkout  <commit-id>
// 会有下边提示 detached HEAD，  
You are in 'detached HEAD' state.
当前 Git 仓库的头指针不指向任何分支，处于游离状态或者说分离状态。
当我们做一些不确定的工作时，只是在尝试。此时分离头指针就很有用，如果尝试成功了，就创建一个分支，然后合并到主分支上。如果失败，要放弃分离后的 commit， 则直接切换到其他分支，继续工作，不必理会。
HEAD头指针会落脚于某个commit
git diff 默认比较工作区和暂存区的不同
git diff -- file 比较指定文件的不同
git diff commit-id commit-id 比较两个commit的不同
git diff HEAD HEAD^ 比较当前 commit 和父 commit
git diff HEAD HEAD^^ 比较当前commit 和爷 commit
git diff --cached 暂存区和 HEAD 之间的差异
git diff temp master 比较两个分支的差异
git diff temp master -- file 比较两个分支指定文件的差异
git diff commit-id commit-id -- file 比较两个分支指定文件的差异

git reset HEAD 恢复暂存区和 HEAD 一致
git reset HEAD^ 恢复暂存区和 父HEAD 一致
git reset HEAD -- file 恢复指定文件暂存区和 HEAD 一致
git reflog 查看所有log
git reset --hard commit-id 强制回退到某个版本,commit-id后的暂存区和工作区的变更
git reset 变更暂存区的内容
git checkout 变更工作区的内容
git checkout -- file 恢复工作区的指定文件
git checkout -b 'button' 添加并且切换到button分支
git checkout -b temp 38745b5 基于38745b5版本创建并切换到temp分支
git checkout master 切换到master分支
git branch 查看当前是什么分支
git branch -av 查看本地有什么分支
git branch -v 查看本地有什么分支
git branch -D button 删除button分支


git commit --amend 对最近一次commit的message做变更
git rebase -i 父commit-id 对指定commit的message做变更（分支还没有提交远程）
git rebase -i 父commit-id 对指定多个连续commit做合并（squash）

git 常用的传输协议
本地协议(1)  /path/to/repo.git           哑协议
本地协议(2)  file:///path/to/repo.git    智能协议
http/https  http://git-server.com:port/path/to/repo.git 平时接触到的都是智能协议
ssh         user@git-server.com:path/to/repo.git    工作中最常用的智能协议
哑协议传输进度不可见；智能协议进度可见；智能协议传输速度比哑协议快

git clone --bare /e/code/TrainingCamp/engineering/git/git_learning 
git clone --bare file:///path/to/repo.git 备份不带工作区的远端仓库
git remote -v   查看远程地址
git remote add zhineng file:///path/to/repo.git 添加远程地址
git push origin branch



git merge --abort 取消合并状态
git merge --squash button 把合并分支变成了一次修改的过程
git tag v1.0 打一个tag
git cat-file -t file 查看文件类型
git cat-file -p file 查看文件内容
ls -al 查看所有文件
touch file 创建文件
cat file 查看文件
vi file 编辑文件
find .git/objects -type f 找文件夹下类型是文件的
echo "hello world" > readme 创建readme文件写入hello world


