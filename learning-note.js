﻿
〖============================================================================================================〗

〖==================================================Artisan===================================================〗

〖============================================================================================================〗

 【创建控制器】（主页）
	$ php artisan make:controller PagesController

 【登录注册】首先执行认证脚手架命令，生成代码：
	$ php artisan make:auth
	命令 make:auth 会询问我们是否要覆盖 app.blade.php，因为我们在前面章节中已经自定义了
	『主要布局文件』—— app.blade.php，所以此处输入 no

 【新增表】

   ① 新建模型
	$ php artisan make:model Models/Category -m

   ② 设计表
	修改database/migrations下的table文件，取设置字段

   ③ 执行迁移
	$ php artisan migrate


  ·每当我们创建完数据模型后，都需要设置 Category 的 $fillable 属性（可修改字段）




 【初始化分类数据】

	$ php artisan make:migration seed_categories_data（向数据库表内注入数据）


 【修改表】
	我们进行的是字段添加操作，因此在命名迁移文件时需要加上前缀，遵照如 add_column_to_table 
	这样的命名规范，并在生成迁移文件的命令中设置 --table 选项，用于指定对应的数据库表。
	最终的生成命令如下：

	① $ php artisan make:migration add_avatar_and_introduction_to_users_table --table=users


	② 设计表

		修改add_avatar_and_introduction_to_users_table

	③ 执行迁移
		$ php artisan migrate

 【创建表单请求验证】

	表单请求验证（FormRequest） 是 Laravel 框架提供的用户表单数据验证方案，此方案相比手工调用 validator 来说，能处理更为复杂的验证逻辑，更加适用于大型程序。在本课程中，我们将统一使用 表单请求验证来处理表单验证逻辑。

	接下来我们创建 UserRequest ，使用以下命令：

	$ php artisan make:request UserRequest

 【回滚数据库迁移】
	$ php artisan migrate:rollback

 【composer引入后设置其配置信息】
	先 composer install intervention/image
 	$ php artisan vendor:publish --provider="Intervention\Image\ImageServiceProviderLaravel5"


 【代码生成Model】

	代码生成器能让你通过执行一条 Artisan 命令，完成注册路由、新建模型、新建表单验证类、新建资源控制器以及所需视图文件等任务。

	php artisan make:scaffold Projects --schema="name:string:index,description:text:nullable,subscriber_count:integer:unsigned:default(0)"

	接下来我们看下代码生成器为我们做了哪些事情：

		1.创建话题的数据库迁移文件 —— 2017_09_26_111713_create_topics_table.php；
		2.创建话题数据工厂文件 —— TopicFactory.php；
		3.创建话题数据填充文件 —— TopicsTableSeeder.php；
		4.创建模型基类文件 —— Model.php， 并创建话题数据模型；
		5.创建话题控制器 —— TopicsController.php；
		6.创建表单请求的基类文件 —— Request.php，并创建话题表单请求验证类；
		7.创建话题模型事件监控器 TopicObserver 并在 AppServiceProvider 中注册；
		8.创建授权策略基类文件 —— Policy.php，同时创建话题授权类，并在 AuthServiceProvider 中注册；
		9.在 web.php 中更新路由，新增话题相关的资源路由；
		10.新建符合资源控制器要求的三个话题视图文件，并存放于 resources/views/topics 目录中；
		11.执行了数据库迁移命令 artisan migrate；
		因此次操作新建了多个文件，最终执行 composer dump-autoload 来生成 classmap


【回滚数据库迁移】
	$ php artisan migrate:refresh --seed

	Laravel 的 migrate:refresh 命令会回滚数据库的所有迁移，并运行 migrate 命令，--seed 选项会同时运行 db:seed 命令。

【生成任务类】

	$ php artisan make:job TranslateSlug

	该命令会在 app/Jobs 目录下生成一个新的类
【启动队列】
	$ php artisan queue:listen




〖=========================================================================================================================================〗

〖================================================================Composer=================================================================〗

〖=========================================================================================================================================〗
	composer --help

	composer remove twbs/bootstrap  

	不过这只是删除了依赖关系，不会自动加载，但其依赖包还在vender文件夹里，可手动删除。



【安装图片验证码包】
	$ composer require "mews/captcha:~2.0"
	运行以下命令生成配置文件 config/captcha.php：
	$  php artisan vendor:publish --provider='Mews\Captcha\CaptchaServiceProvider' 



【安装汉化语言包】
	composer require "overtrue/laravel-lang:~3.0"



【安装图片处理包】
	$ composer require intervention/image
	执行以下命令获取配置信息：
	$ php artisan vendor:publish --provider="Intervention\Image\ImageServiceProviderLaravel5"


【代码生成器】『Laravel 5.x Scaffold Generator』
	$ composer require "summerblue/generator:~0.5" --dev


【调式工具】 『Debugbar』

	使用 Composer 安装：
		$ composer require "barryvdh/laravel-debugbar:~3.1" --dev
	
	生成配置文件，存放位置 config/debugbar.php：

		$ php artisan vendor:publish --provider="Barryvdh\Debugbar\ServiceProvider"
	
	打开 config/debugbar.php，将 enabled 的值设置为：

		'enabled' => env('APP_DEBUG', true),

	修改完以后, Debugbar 分析器的启动状态将由 .env文件中 APP_DEBUG 值决定。


【防XSS安全漏洞】[HTMLPurifier]
	HTMLPurifier 本身就是一个独立的项目，运用『白名单机制』对 HTML 文本信息进行 XSS 过滤。

	『白名单机制』指的是使用配置信息来定义『HTML 标签』、『标签属性』和『CSS 属性』数组，在执行 clean() 方法时，只允许配置信息『白名单』里出现的元素通过，其他都进行过滤。

	1. 安装 HTMLPurifier for Laravel 5

	使用 Composer 安装：

			$ composer require "mews/purifier:~2.0"

	2. 配置 HTMLPurifier for Laravel 5
		命令行下运行

			$ php artisan vendor:publish --provider="Mews\Purifier\PurifierServiceProvider"

	请将配置信息替换为以下:

		config/purifier.php

			<?php

			return [
			    'encoding'      => 'UTF-8',
			    'finalize'      => true,
			    'cachePath'     => storage_path('app/purifier'),
			    'cacheFileMode' => 0755,
			    'settings'      => [
			        'user_topic_body' => [
			            'HTML.Doctype'             => 'XHTML 1.0 Transitional',
			            'HTML.Allowed'             => 'div,b,strong,i,em,a[href|title],ul,ol,ol[start],li,p[style],br,span[style],img[width|height|alt|src],*[style|class],pre,hr,code,h2,h3,h4,h5,h6,blockquote,del,table,thead,tbody,tr,th,td',
			            'CSS.AllowedProperties'    => 'font,font-size,font-weight,font-style,margin,width,height,font-family,text-decoration,padding-left,color,background-color,text-align',
			            'AutoFormat.AutoParagraph' => true,
			            'AutoFormat.RemoveEmpty'   => true,
			        ],
			    ],
			];

		配置里的 user_topic_body 是我们为话题内容定制的，配合 clean() 方法使用：

			$topic->body = clean($topic->body, 'user_topic_body');

【 安装依赖 Guzzle】

	Guzzle 库是一套强大的 PHP HTTP 请求套件，我们使用 Guzzle 的 HTTP 客户端来请求 百度翻译 接口。

	使用 Composer 安装 Guzzle 类库：

		$ composer require "guzzlehttp/guzzle:~6.3"

	无需配置，安装完成后即可使用。我们已在 SlugTranslateHandler.php 顶部 use 引入使用。

【 安装依赖 PinYin 】

	PinYin 是 安正超 开发的，基于 CC-CEDICT 词典的中文转拼音工具，是一套优质的汉字转拼音解决方案。我们使用 PinYin 来作为翻译的后备计划，当百度翻译 API 不可用时，程序会自动使用 PinYin 汉字转拼音方案来生成 Slug。

	使用 Composer 安装 PinYin 类库：

		$ composer require "overtrue/pinyin:~3.0"

	同样的，我们已在 SlugTranslateHandler.php 顶部 use 引入使用。

【安装配置队列】

	bbs课程队列链接：https://laravel-china.org/courses/laravel-intermediate-training-5.5/663/using-queues
	
	队列的配置信息储存于 config/queue.php 文件中，在这个文件中你会发现框架所支持的队列驱动的配置连接示例。这些驱动包括：数据库，Beanstalkd，Amazon SQS，Redis，和一个同步（本地使用）的驱动。还有一个名为 null 的驱动表明不使用队列任务。

	本项目中，我们将使用 Redis 来作为我们的队列驱动器，先使用 Composer 安装依赖：

	$ composer require "predis/predis:~1.0"
	接下来我们还需要修改环境变量 QUEUE_DRIVER 的值为 redis：

	.env

	.
	.
	.
	QUEUE_DRIVER=redis

	.
	.
	.

【导航组件】
	$ composer require "hieu-le/active:~3.5"

	原文链接 https://laravel-china.org/courses/laravel-intermediate-training-5.5/654/category-topics



〖===============================================================================〗

〖======================================Git======================================〗

〖===============================================================================〗
 【初始化】

	$ git init   


	克隆远程版本仓库到本地：

		git clone https://github.com/BestJinxLa>/larabbs.git

	查看远程仓库的信息

		git remote -v   

	将远程版本库中的最新代码同步到本地

		git pull origin master  
   
【提交代码】
   	git add -A
 
  	git commit -m "提示语"
 
   	git  remote add origin https://github.com/BestJinxLa>/larabbs.git

   	git remote remove <name>

   	
   	git remote show origin
 
    git push origin master

 【git status】 查看本地代码修改了那些文件
 
 【.gitignore】 我们在上传图片的时候，程序自动创建了 public/uploads/images/avatars/ 目录，此文件夹下的文件皆为用户上传的头像文件，我们需要防止这些文件被纳入 Git 版本控制器中，可以利用 Git 的 .gitignore 机制来实现：

   	public/uploads/images/avatars/.gitignore文件内写入如下代码：
   
   	*
   	!.gitignore

   	上面的两行代码意为：当前文件夹下，忽略所有文件，除了 .gitignore文件。

【还原修改文件到原始状态 】
	$ git checkout . 

【清理项目】（先还原再清理）
	$ git clean -f -d 

命令 git clean 作用是清理项目，-f 是强制清理文件的设置，-d 选项命令连文件夹一并清除。



【删除git】
$ rm -rf .git  // 删除.git  



【禁用自动转换】
$ git config --global core.autocrlf false 

windows中的换行符为 CRLF， 而在linux下的换行符为LF，所以在执行add . 时出现提示warning: LF will be replaced by CRLF

































〖==========================================================================================================================〗

〖======================================================Homestead新增站点===================================================〗

〖==========================================================================================================================〗


> subl ~/Homestead/Homestead.yaml
sites:
    - map: homestead.test
      to: /home/vagrant/Code/Laravel/public
    - map: larabbs.test # <--- 这里
      to: /home/vagrant/Code/larabbs/public # <--- 这里

databases:
    - homestead
    - larabbs # <--- 这里


在我们每次对 Homestead.yaml 文件进行了更改之后，都需要运行下面命令来使其更改生效：

重启虚拟机
> cd ~/Homestead && vagrant provision && vagrant reload

















































〖===========================================================================================================================================================================〗

〖==================================================================================Linux====================================================================================〗

〖===========================================================================================================================================================================〗

 ·因为无需使用 make:auth 生成的主页，请运行以下命令【删除无用文件】：
	$ rm app/Http/Controllers/HomeController.php
	$ rm resources/views/home.blade.php


 ·现在让我们先来【创建】一个 app/Models 文件夹，并将 User.php 文件【移动】到其中。
	$ mkdir app/Models
	$ mv app/User.php app/Models/User.php

【用vagrant搭起的homestead7如何创建root用户】

	①使用VirtualBox启动虚拟机  --   开机按shift或esc先进行recovery模式

	②先执行   #mount -o remount,rw /   命令
	
	③
		#chown root:root /usr/bin/sudo
		#chmod 4755 /usr/bin/sudo
	
	④
		sudo ls

		如果报则进行第5步

		#sudo: /usr/lib/sudo/sudoers.so must be owned by uid 0
		#sudo: fatal error, unable to load plugins

	⑤ 重新进入恢复root模式

		运行

		#chown root /usr/lib/sudo/sudoers.so

		重启问题解决。

	⑥ 创建root登陆密码

		执行sudo passwd root 命令，设置你的密码；















〖==========================================================================================================================〗

〖===========================================================Laravel========================================================〗

〖==========================================================================================================================〗


【composer 自动加载】原文链接  https://laravel-china.org/topics/1002/deep-composer-autoload

 
【N+1问题】 

		为了读取 user 和 category，每次的循环都要查一下 users 和 categories 表，在本例子中我们查询了 30 条话题数据，那么最终我需要执行的查询语句就是 30 * 2 + 1 = 61 条语句。如果我第一次查询出来的是 N 条记录，那么最终需要执行的 SQL 语句就是 N+1 次

		我们可以通过 Eloquent 提供的 预加载功能 来解决此问题：

		app/Http/Controllers/TopicsController.php

		<?php
		.
		.
		.
		class TopicsController extends Controller
		{
		    .
		    .
		    .
		    public function index()
		    {
		        $topics = Topic::with('user', 'category')->paginate(30);
		        return view('topics.index', compact('topics'));
		    }
		    .
		    .
		    .
		}























〖=========================================================================〗

〖==============================Laravel创建应用============================〗

〖=========================================================================〗
 ·Composer 加速

	$ composer config -g repo.packagist composer https://packagist.phpcomposer.com

 ·创建 LaraBBS 应用

	$ cd ~/Code
	$ composer create-project laravel/laravel larabbs --prefer-dist "5.5.*"






























〖==========================================================================================================================〗

〖=========================================================Laravel Mix======================================================〗

〖==========================================================================================================================〗

 ·运行 Laravel Mix
 	Yarn 配置安装加速：
	$ yarn config set registry https://registry.npm.taobao.org

 ·使用 Yarn 安装依赖：
	$ yarn install

 ·安装成功后，运行以下命令即可:
	$ npm run watch-poll
	watch-poll 会在你的终端里持续运行，监控 resources 文件夹下的资源文件是否有发生改变.

	·$ npm run watch-poll 运行报错：
		$ npm rebuild node-sass --no-bin-links



























〖=========================================================================〗

〖=============================Laravel Request=============================〗

〖=========================================================================〗


 ·字段唯一性：
	'name' => 'required|between:4,25|regex:/^[A-Za-z0-9\-\_]+$/|unique:users,name,' . Auth::id()
	
 ·图片文件的rule：
	'avatar' => 'mimes:jpeg,bmp,png,gif|dimensions:min_width=200,min_height=200'
	
 ·图像处理：
	https://blog.csdn.net/json_ligege/article/details/76551270

















〖=========================================================================〗

〖=============================Laravel 权限控制============================〗

〖=========================================================================〗


 原为链接：https://laravel-china.org/courses/laravel-intermediate-training-5.5/644/access-control
    
    一. 未登录不能访问：
     
    Laravel 【中间件 (Middleware)】 为我们提供了一种非常棒的过滤机制来过滤进入应用的 HTTP 请求；
    	public function __construct()
    	{
        	$this->middleware('auth', ['except' => ['show']]);
    	}
    我们通过 except 方法来设定 指定动作 不使用 Auth 中间件进行过滤，意为 —— 除了此处指定的动作以外，所有其他动作都必须登录用户才能访问，类似于黑名单的过滤机制。
    相反的还有 only 白名单方法，将只过滤指定动作。我们提倡在控制器 Auth 中间件使用中，首选 except 方法，这样的话，当你新增一个控制器方法时，默认是安全的，此为最佳实践。
    

    二. 只能编辑自己的资料：
	在 Laravel 中可以使用 【授权策略 (Policy)】 来对用户的操作权限进行验证，在用户未经授权进行操作时将返回 403 禁止访问的异常；
	我们可以使用以下命令来生成一个名为 UserPolicy 的授权策略类文件，用于管理用户模型的授权。
	
	·$ php artisan make:policy UserPolicy
	
	·所有生成的授权策略文件都会被放置在 app/Policies 文件夹下，新增update方法：
	 public function update(User $currentUser, User $user)
    	{
        	return $currentUser->id === $user->id;
    	}

	·接下来我们还需要在 AuthServiceProvider 类中对授权策略进行注册。
	 <?php

	namespace App\Providers;
	.
	.
	.
	class AuthServiceProvider extends ServiceProvider
	{
    	/**
     	* The policy mappings for the application.
     	*
     	* @var array
     	*/
    	protected $policies = [
        	'App\Model' => 'App\Policies\ModelPolicy',
        	\App\Models\User::class  => \App\Policies\UserPolicy::class,
    	];
    	.
    	.
    	.
	}

	·授权策略定义完成之后，我们便可以在控制器中使用 authorize 方法来检验用户是否授权。
	
	 	authorize 方法接收两个参数，第一个为授权策略的名称，第二个为进行授权验证的数据。

	  	我们需要为 edit 和 update 方法加上这行：

	  	$this->authorize('update', $user);
	  
	  	引用use Illuminate\Auth\Access\AuthorizationException;

   		try {
        	$this->authorize('update', $user);
        	return view('users.edit',compact('user'));
    	} catch (AuthorizationException $e) {
       		return  view('common.403');
    	}


〖==========================================================================================================================〗

〖==================================================Laravel 模型关联========================================================〗

〖==========================================================================================================================〗
原文链接: https://laravel-china.org/courses/laravel-intermediate-training-5.5/650/topic-index-page
详细介绍: https://laravel-china.org/docs/laravel/5.5/eloquent-relationships#one-to-one

开始之前，我们需要对 Topic 数据模型进行修改，新增 category 和 user 的模型关联：

category—— 一个话题属于一个分类；
user —— 一个话题拥有一个作者。
这两个关联都属于 一对一 对应关系，故我们使用 belongsTo() 方法来实现，代码如下：[app/Models/Topic.php]

class Topic extends Model
{
    protected $fillable = ['title', 'body', 'user_id', 'category_id', 'reply_count', 'view_count', 'last_reply_user_id', 'order', 'excerpt', 'slug'];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}














〖==========================================================================================================================〗

〖==================================================Laravel 文件上传========================================================〗

〖==========================================================================================================================〗



 ·Laravel 的『用户上传文件对象』底层使用了 Symfony 框架的 UploadedFile 对象进行渲染；

 【课程原文链接】https://laravel-china.org/courses/laravel-intermediate-training-5.5/643/upload-avatar

 ·安装扩展包

  1.安装 Intervention/image
	$ composer require intervention/image

  2.配置信息
	$ php artisan vendor:publish --provider="Intervention\Image\ImageServiceProviderLaravel5"
 
 ·request中的rules限制：

	'avatar' => 'mimes:jpeg,bmp,png,gif|dimensions:min_width=200,min_height=200'

 【拓展】使用 Intervention/image 对 Laravel 项目中的图片进行处理：
 	
	原文链接：http://api.symfony.com/3.0/Symfony/Component/HttpFoundation/File/UploadedFile.html


















〖==========================================================================================================================〗

〖======================================================Laravel 数据工厂====================================================〗

〖==========================================================================================================================〗

原文链接 https://laravel-china.org/courses/laravel-intermediate-training-5.5/649/seeding-data

【生成假数据】

	1. 用户的数据工厂

	Laravel 框架自带了 UserFactory.php 作为示例文件：

	database/factories/UserFactory.php
	<?php

	use Faker\Generator as Faker;


	$factory->define(App\Models\User::class, function (Faker $faker) {
	    static $password;

	    return [
	        'name' => $faker->name,
	        'email' => $faker->unique()->safeEmail,
	        'password' => $password ?: $password = bcrypt('secret'),
	        'remember_token' => str_random(10),
	    ];
	});

	define 定义了一个指定数据模型（如此例子 User）的模型工厂。define 方法接收两个参数，第一个参数为指定的 Eloquent 模型类，
	第二个参数为一个闭包函数，该闭包函数接收一个 Faker PHP 函数库的实例，让我们可以在函数内部使用 Faker 方法来生成假数据并为模型的指定字段赋值。

	我们需要增加 introduction 用户简介字段的填充，另外我们计划在 UsersTableSeeder 里使用 批量入库 的方式填充数据，因此需要自行填充 created_at 和 updated_at 两个字段。修改后的代码如下：

	<?php

	use Faker\Generator as Faker;
	use Carbon\Carbon;

	$factory->define(App\Models\User::class, function (Faker $faker) {
	    static $password;
	    $now = Carbon::now()->toDateTimeString();

	    return [
	        'name' => $faker->name,
	        'email' => $faker->unique()->safeEmail,
	        'password' => $password ?: $password = bcrypt('password'),
	        'remember_token' => str_random(10),
	        'introduction' => $faker->sentence(),
	        'created_at' => $now,
	        'updated_at' => $now,
	    ];
	});

	Faker 是一个假数据生成库，sentence() 是 faker 提供的 API ，随机生成『小段落』文本。我们用来填充 introduction 个人简介字段。

	Carbon 是 PHP DateTime 的一个简单扩展，这里我们使用 now() 和 toDateTimeString() 来创建格式如 2017-10-13 18:42:40 的时间戳。

	2. 用户数据填充
	使用以下命令生成数据填充文件：
		$ php artisan make:seed UsersTableSeeder

	修改 刚生成的 database/seeds/UsersTableSeeder.php 如以下:
	<?php

	use Illuminate\Database\Seeder;
	use App\Models\User;

	class UsersTableSeeder extends Seeder
	{
	    public function run()
	    {
	        // 获取 Faker 实例
	        $faker = app(Faker\Generator::class);

	        // 头像假数据
	        $avatars = [
	            'https://fsdhubcdn.phphub.org/uploads/images/201710/14/1/s5ehp11z6s.png?imageView2/1/w/200/h/200',
	            'https://fsdhubcdn.phphub.org/uploads/images/201710/14/1/Lhd1SHqu86.png?imageView2/1/w/200/h/200',
	            'https://fsdhubcdn.phphub.org/uploads/images/201710/14/1/LOnMrqbHJn.png?imageView2/1/w/200/h/200',
	            'https://fsdhubcdn.phphub.org/uploads/images/201710/14/1/xAuDMxteQy.png?imageView2/1/w/200/h/200',
	            'https://fsdhubcdn.phphub.org/uploads/images/201710/14/1/ZqM7iaP4CR.png?imageView2/1/w/200/h/200',
	            'https://fsdhubcdn.phphub.org/uploads/images/201710/14/1/NDnzMutoxX.png?imageView2/1/w/200/h/200',
	        ];

	        // 生成数据集合
	        $users = factory(User::class)
	                        ->times(10)
	                        ->make()
	                        ->each(function ($user, $index)
	                            use ($faker, $avatars)
	        {
	            // 从头像数组中随机取出一个并赋值
	            $user->avatar = $faker->randomElement($avatars);
	        });

	        // 让隐藏字段可见，并将数据集合转换为数组
	        $user_array = $users->makeVisible(['password', 'remember_token'])->toArray();

	        // 插入到数据库中
	        User::insert($user_array);

	        // 单独处理第一个用户的数据
	        $user = User::find(1);
	        $user->name = 'Summer';
	        $user->email = 'summer@yousails.com';
	        $user->avatar = 'https://fsdhubcdn.phphub.org/uploads/images/201710/14/1/ZqM7iaP4CR.png?imageView2/1/w/200/h/200';
	        $user->save();

	    }
	}

	代码讲解

	顶部使用 use 关键词引入必要的类。

	// factory(User::class) 根据指定的 User 生成模型工厂构造器，对应加载 UserFactory.php 中的工厂设置。

	times(10) 指定生成模型的数量，此处我们只需要生成 10 个用户数据。

	make() 方法会将结果生成为 集合对象。

	each() 是 集合对象 提供的 方法，用来迭代集合中的内容并将其传递到回调函数中。

	use 是 PHP 中匿名函数提供的本地变量传递机制，匿名函数中必须通过 use 声明的引用，才能使用本地变量。

	makeVisible() 是 Eloquent 对象提供的方法，可以显示 User 模型 $hidden 属性里指定隐藏的字段，此操作确保入库时数据库不会报错。


	3. 注册数据填充

	//先去掉 $this->call(UsersTableSeeder::class); 的注释，还要注释掉我们还未开发 TopicsTableSeeder 调用：

	database/seeds/DatabaseSeeder.php

	<?php

	use Illuminate\Database\Seeder;

	class DatabaseSeeder extends Seeder
	{
	    /**
	     * Run the database seeds.
	     *
	     * @return void
	     */
	    public function run、()
	    {
	        $this->call(UsersTableSeeder::class);
	        // $this->call(TopicsTableSeeder::class);
	    }
	}

	4. 测试一下

		使用以下命令运行迁移文件：

			$ php artisan db:seed

〖==========================================================================================================================〗

〖=========================================================Laravel 队列======================================================〗

〖==========================================================================================================================〗

1. 配置队列
	队列的配置信息储存于 config/queue.php 文件中，在这个文件中你会发现框架所支持的队列驱动的配置连接示例。这些驱动包括：数据库，Beanstalkd，Amazon SQS，Redis，和一个同步（本地使用）的驱动。还有一个名为 null 的驱动表明不使用队列任务。

	本项目中，我们将使用 Redis 来作为我们的队列驱动器，先使用 Composer 安装依赖：

		$ composer require "predis/predis:~1.0"
	接下来我们还需要修改环境变量 QUEUE_DRIVER 的值为 redis：

		.env


		.
		.
		.

		QUEUE_DRIVER=redis

		.
		.
		.

	失败任务

		有时候队列中的任务会失败。Laravel 内置了一个方便的方式来指定任务重试的最大次数。当任务超出这个重试次数后，它就会被插入到 failed_jobs 数据表里面。我们可以使用 queue:failed-table 命令来创建 failed_jobs 表的迁移文件：

			$ php artisan queue:failed-table

		会新建 database/migrations/{timestamp}_create_failed_jobs_table.php 文件。

		接着使用 migrate Artisan 命令生成 failed_jobs 表：

			$ php artisan migrate

2. 生成任务类

	使用以下 Artisan 命令来生成一个新的队列任务：

		$ php artisan make:job TranslateSlug

	该命令会在 app/Jobs 目录下生成一个新的类：

		app/Jobs/TranslateSlug.php

3. 任务分发
	接下来我们要修改 Topic 模型监控器，将 Slug 翻译的调用修改为队列执行的方式：

	app/Observers/TopicObserver.php
	<?php
	·
	·
	·
		// 如 slug 字段无内容，即使用翻译器对 title 进行翻译
        if ( ! $topic->slug) {

            // 推送任务到队列
            dispatch(new TranslateSlug($topic));
        }
    ·
    ·
4. 开始测试

	开始之前，我们需要在命令行启动队列系统，队列在启动完成后会进入监听状态：

		$ php artisan queue:listen

	在命令行中可以看到监听的状态,虽然我们能够从 payload 和 exception 字段中看到报错的信息，但因为是序列化以后的信息，所以并不直观所以用Horizon

5. 队列监控 Horizon

	Horizon 是 Laravel 生态圈里的一员，为 Laravel Redis 队列提供了一个漂亮的仪表板，允许我们很方便地查看和管理 Redis 队列任务执行的情况。

	使用 Composer 安装：

		$ composer require "laravel/horizon:~1.0"

	安装完成后，使用 vendor:publish Artisan 命令发布相关文件：

		$ php artisan vendor:publish --provider="Laravel\Horizon\HorizonServiceProvider"

	分别是配置文件 config/horizon.php 和存放在 public/vendor/horizon 文件夹中的 CSS 、JS 等页面资源文件。

	至此安装完毕，浏览器打开 http://k3nny.bbs/horizon 访问控制台：



	Horizon 是一个监控程序，需要常驻运行，我们可以通过以下命令启动：

	$ php artisan horizon

	安装了 Horizon 以后，我们将使用 horizon 命令来启动队列系统和任务监控，无需使用 queue:listen。

	接下来我们再次尝试下发帖，发帖之前，请确保 horizon 命令处于监控状态：

6. 代码调整

	既然我们已经定位到了问题，解决的方法也很简单，只需要确保分发任务时 $topic->id 有值即可。我们需要修改任务分发的时机：

	app/Observers/TopicObserver.php

		<?php

		namespace App\Observers;

		use App\Models\Topic;
		use App\Jobs\TranslateSlug;

		// creating, created, updating, updated, saving,
		// saved,  deleting, deleted, restoring, restored

		class TopicObserver
		{
		    public function saving(Topic $topic)
		    {
		        // XSS 过滤
		        $topic->body = clean($topic->body, 'user_topic_body');

		        // 生成话题摘录
		        $topic->excerpt = make_excerpt($topic->body);
		    }

		    public function saved(Topic $topic)
		    {
		        // 如 slug 字段无内容，即使用翻译器对 title 进行翻译
		        if ( ! $topic->slug) {

		            // 推送任务到队列
		            dispatch(new TranslateSlug($topic));
		        }
		    }
		}

	模型监控器的 saved() 方法对应 Eloquent 的 saved 事件，此事件发生在创建和编辑时、数据入库以后。在 saved() 方法中调用，确保了我们在分发任务时，$topic->id 永远有值。

	需要注意的是，artisan horizon 队列工作的守护进程是一个常驻进程，它不会在你的代码改变时进行重启，当我们修改代码以后，需要在命令行中对其进行重启操作。
	

	重启 horizon 命令后再次尝试：

		$ php artisan horizon

7. 线上部署须知
	在开发环境中，我们为了测试方便，直接在命令行里调用 artisan horizon 进行队列监控。然而在生产环境中，
	我们需要配置一个进程管理工具来监控 artisan horizon 命令的执行，以便在其意外退出时自动重启。
	当服务器部署新代码时，需要终止当前 Horizon 主进程，然后通过进程管理工具来重启，从而使用最新的代码。

	简而言之，生产环境下使用队列需要注意以下两个问题：

	7.1.使用  Supervisor 进程工具进行管理，配置和使用请参照 文档 进行配置 ；
		(文档连接：https://laravel-china.org/docs/laravel/5.5/horizon#Supervisor-%E9%85%8D%E7%BD%AE)
	
	7.2.每一次部署代码时，需 artisan horizon:terminate 然后再 artisan horizon 重新加载代码。

8. 使用 Sync 队列驱动
	既然功能已经开发测试完毕，为了后续开发的方便，我们将开发环境的队列驱动改回 sync 同步模式，也就是说不使用任何队列，实时执行：

	.env

	QUEUE_DRIVER=sync






〖==========================================================================================================================〗

〖=========================================================Mysql============================================================〗

〖==========================================================================================================================〗


  $ mysql -u homestead -p
	mysql 是 MySQL 终端命令的调用名称， 参数 -u 是指定用户，homestead 是 Homestead 虚拟机中
	为我们准备好的 MySQL 用户，-p 参数是告知我们将要为 homestead 用户输入密码。

	按回车键以后，命令行将会要求你输入 MySQL 密码，
	密码在 .env 文件里的 DB_PASSWORD 选项中可以找到，是 secret，输入密码后按回车，就能进入 MySQL 
	命令行终端。
	在 MySQL 命令行终端里，命令行提示符号为 mysql>，在接下来的章节中，如果你遇到此命令行提示符，
	请识别为此命令必须在 MySQL 命令行终端里运行。


  简单描述表结构，字段类型:
	desc table_name;



	Host: 192.168.10.10
	Port: 33060
	User: homestead
	Pass: secret















〖==========================================================================================================================〗

〖==========================================================PHP=============================================================〗

〖==========================================================================================================================〗


【从 0 到 1 优雅的实现 PHP 多进程管理】

	https://www.muzilong.cn/storage/html/69/www.v2ex.com/t/411020.html
	


【PHP 是什么-PHP 的架构及原理概述】 

	https://laravel-china.org/articles/8395/an-overview-of-the-architecture-and-principles-of-what-php-is-php




【教你在不使用框架的情况下也能写出现代化 PHP 代码】

	https://phphub.org/topics/9365




【新的三元赋值】

	'password' => $password ?: $password = bcrypt('secret'),	















〖==========================================================================================================================〗

〖=========================================================Vagrant==========================================================〗

〖==========================================================================================================================〗

命令行	说明
vagrant init	初始化 vagrant
vagrant up	启动 vagrant
vagrant halt	关闭 vagrant
vagrant ssh	通过 SSH 登录 vagrant（需要先启动 vagrant）
vagrant provision	重新应用更改 vagrant 配置
vagrant destroy	删除 vagrant

在虚拟机界面下可以输入退出虚拟机：
$ exit
最后尝试关闭 Homestead：
> vagrant halt

重启虚拟机
> cd ~/Homestead && vagrant provision && vagrant reload



























〖==========================================================================================================================〗

〖=========================================================常见问题=========================================================〗

〖==========================================================================================================================〗

 

 · windows开发环境搭建

	原文链接：https://laravel-china.org/docs/laravel-development-environment/5.5/development-environment-windows



 · Windows 系统使用 Homestead 运行 Laravel 本地项目响应缓慢问题
	原文链接：https://laravel-china.org/articles/9009/solving-the-slow-response-problem-of-the-windows-system-using-homestead-to-run-laravel-project
	首先，命令行进入 Homestead 启动 vagrant
	> cd ~/Homestead && vagrant up
	$ vagrant plugin install vagrant-winnfsd
	文件1：homestead/scripts/homestead.rb
	如下：
		# Register All Of The Configured Shared Folders
		if settings.include? 'folders'
			·
			·
			·
		end

	修改为：
		if settings.include? 'folders'
		  settings["folders"].sort! { |a,b| a["map"].length <=> b["map"].length }

		  settings["folders"].each do |folder|
		    config.vm.synced_folder folder["map"], folder["to"], 
		    id: folder["map"],
		    :nfs => true,
		    :mount_options => ['nolock,vers=3,udp,noatime']
		  end
		end

	文件2：Homestead.yaml
		folders:
	    		- map: ~/Code
	     		to: /home/vagrant/Code
	      		type: nfs
	重启 Homestead 使配置文件生效，大功告成。


【laravel提示汉化（安装汉化语言包即可）】：
	composer require "overtrue/laravel-lang:~3.0"

【如何将laravel部署到云服务器】

	安装系统选择 ubuntu 16.04

	然后通过 ssh 登录远程服务器按下列步骤进行配置：

	更新列表
		apt-get update

	安装语言包

		sudo apt-get install -y language-pack-en-base
		locale-gen en_US.UTF-8

	安装常用软件

		sudo apt-get install -y vim git zip unzip

	安装PHP7

		//请确保每一步没有出错，如果有报错，可尝试多安装几次
 
		sudo apt-get install -y software-properties-common

		sudo LC_ALL=en_US.UTF-8 add-apt-repository ppa:ondrej/php

		sudo apt-get update

		apt-cache search php7.1

		sudo apt-get install -y php7.1

		sudo apt-get install -y php7.1-mysql

		sudo apt-get install -y php7.1-fpm

		sudo apt-get install -y php7.1-curl php7.1-xml php7.1-mcrypt php7.1-json php7.1-gd php7.1-mbstring

	安装 Mysql

		sudo apt-get install -y mysql-server
		//安装完后需设置密码

	安装 Nginx

		//安装之前需确认是否安装了apache2，如果已经安装了apache2，需要先停止/卸载 apache2
 
		sudo service apache2 stop

		//安装 nginx
 
		sudo apt-get install -y nginx

	配置 PHP7

		sudo vim /etc/php/7.1/fpm/php.ini

		//修改 cgi.fix_pathinfo=0

		sudo vim /etc/php/7.1/fpm/pool.d/www.conf

		//修改 listen = /var/run/php7.1-fpm.sock
 
	配置 Nginx

		sudo vim /etc/nginx/sites-available/default

		//修改如下，根据自己的项目情况修改对应信息：'laravel-project'替换为你的项目，'server_domain_or_IP' 替换为你的网站域名或IP地址
		server {

		    root /var/www/laravel-project/public;

		    index index.php index.html index.htm;
		    
		    server_name server_domain_or_IP;
		    
		    location / {
		        try_files $uri $uri/ /index.php?$query_string;      
		    }

		    location ~ \.php$ {
		        try_files $uri /index.php =404;
		        fastcgi_split_path_info ^(.+\.php)(/.+)$;
		        fastcgi_pass unix:/var/run/php7.1-fpm.sock;
		        fastcgi_index index.php;
		        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
		        include fastcgi_params;
		    }
		}

	拉取代码

		//建议先将代码上传到云端代码仓库（github, coding）然后再在服务端上拉取

		cd /var/www

		git clone 地址

	安装 Composer 并使用 Composer 安装代码依赖

		//访问composer 官网获取下面四行代码最新版，直接粘贴执行安装 Composer

		php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
		php -r "if (hash_file('SHA384', 'composer-setup.php') === '669656bab3166a7aff8a7506b8cb2d1c292f042046c5a994c43155c0be6190fa0355160742ab2e1c88d40d5be660b410') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;"
		php composer-setup.php
		php -r "unlink('composer-setup.php');"

		//然后移动 composer.phar
		mv composer.phar /usr/local/bin/composer

		//进入项目目录
		cd /var/www/laravel-project

		//执行 composer install
		composer install
	创建 .env 文件

		//根据项目实际情况修改 .env 文件
		cd /var/www/laravel-project

		cp .env.example .env

		vim .env

	生成 laravel key

		cd /var/www/laravel-project

		php artisan key:generate
	创建数据库，执行迁移

		//首先登录 mysql 创建一个对应项目的数据库，名字应该和 .env 文件中的一致

		cd /var/www/laravel-project

		php artisan migrate
	修改权限

		sudo chown -R www-data:www-data /var/www

		sudo chmod -R 777 /var/www/laravel-project/storage
	重启 Nginx 和 PHP7 fpm

		service nginx restart

		service php7.1-fpm restart
	搞定！

	如果遇到问题请在下方留言，或者在此项目 下提 issue，我会及时回复
 
	原文链接：http://dmmylove.cn/articles/12

【XSS攻击】

	XSS 也称跨站脚本攻击 (Cross Site Scripting)，恶意攻击者往 Web 页面里插入恶意 JavaScript 代码，当用户浏览该页之时，嵌入其中 Web 里面的 JavaScript 代码会被执行，从而达到恶意攻击用户的目的。

	一种比较常见的 XSS 攻击是 Cookie 窃取。我们都知道网站是通过 Cookie 来辨别用户身份的，一旦恶意攻击者能在页面中执行 JavaScript 代码，他们即可通过 JavaScript 读取并窃取你的 Cookie，拿到你的 Cookie 以后即可伪造你的身份登录网站。
	
	有两种方法可以避免 XSS 攻击：

	第一种，对用户提交的数据进行过滤；

	第二种，Web 网页显示时对数据进行特殊处理，一般使用 htmlspecialchars() 输出。



	扩展阅读 —— IBM 文档库：跨站点脚本攻击深入解析
	 	https://www.ibm.com/developerworks/cn/rational/08/0325_segal/

【Supervisor安装与配置】
	在本地分享就有啦。嘻嘻
	

















〖==========================================================================================================================〗

〖=========================================================良心站点=========================================================〗

〖==========================================================================================================================〗

 【投资在学习上的时间和金钱总有一天会回赠给你!】 https://www.muzilong.cn

 【13 个快速构建 Laravel 后台的扩展包】 https://www.jianshu.com/p/c1145d124134?utm_campaign=maleskine&utm_content=note&utm_medium=reader_share&utm_source=weibo
