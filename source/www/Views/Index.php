<html lang="en">
    <head>
        <meta charset="utf-8" />
        <title></title>
        <link href="~/favicon.ico" rel="shortcut icon" type="image/x-icon" />
        <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=0" />

        <link rel="stylesheet" type="text/css" href="/Stylesheets/reset.css" />
        <link rel="stylesheet" type="text/css" href="/Stylesheets/Site.css" />
        <link rel="stylesheet" type="text/css" href="/Stylesheets/app/menu.css" />
    </head>
    <body>
        <div id="page_overlay"></div>
        <div id="main_container">
            <header>
                <div class="content-wrapper">
                    <div class="float-left">
                        <p class="site-title"><!-- @Html.ActionLink("AutoBartender", "Index", "Home") --></p>
                    </div>
                    <div class="float-right">
                        <!-- <section id="login">
                            @Html.Partial("_LoginPartial")
                        </section> -->
                        <nav>
                            <!--
                            <ul id="menu">
                                <li>@Html.ActionLink("Menu", "Index", "Home")</li>
                                <li>@Html.ActionLink("SignalR-Test", "About", "Home")</li>
                            </ul>
                            -->
                        </nav>
                    </div>
                </div>
            </header>
            <div id="body">
                <section class="content-wrapper main-content clear-fix">
                    <div id="initial_response_container">
                        <div id="modal_header">
                            <div class="active_header">Hey Cutie!</div>
                            <div class="inactive_header">Did someone get held back a grade? Okay.</div>
                        </div>
                        <ul id="modal_copy">
                            <li class="active">Did you grab a cup?</li>
                            <li class="active">Did you put ice in it?</li>
                            <li class="active">Did you place it in the machine?</li>
                            <li class="inactive">(Said in a slower voice)</li>
                            <li class="inactive">Grab a cup,</li>
                            <li class="inactive">Put ice in it,</li>
                            <li class="inactive">Then place it in the machine.</li>
                            <li class="inactive">Please.</li>
                        </ul>
                        <div id="modal_responses">
                            <a href="response_yes" class="button" id="response_yes">Yes</a>
                            <a href="response_no" class="button" id="response_no">No</a>
                            <a href="response_additional" class="button" id="response_additional">I understand</a>
                        </div>
                    </div>
                    <div id="menu_container">
                        <div><img src="/Images/hexagon.png" id="hexagon" /></div>
                        <div><img src="/Images/menu.container.png" id="menu_background" /></div>
                        <ul id="menu_header">
                            <li id="serve-drink"><a href="#">Serve</a></li>
                            <li><a href="#">Mixing</a></li>
                            <li><a href="#">Enjoy</a></li>
                        </ul>
                        <div id="menu_pulse"></div>
                        <div id="menu_loader"></div>
                        <ul id="menu_drinks">
                            <?php $counter = 1; ?>
                            <?php foreach($recipes->list as $recipe): ?>
                                <li class="drink_holder">
                                    <?php if($recipe->canBeServed == true) : ?>
                                        <a href="<?php echo 'drink-' . $counter ?>" drink-data-id="<?php echo $recipe->id; ?>"><span class="drink-title"><?php echo $recipe->name ?></span>
                                            <ul>
                                                <li class="ingredients_text"><?php echo $recipe->ingredientsString; ?></li>
                                            </ul>
                                        </a>                                 
                                    <?php else : ?>
                                        <a href="<?php echo 'drink-' . $counter ?>" drink-data-id="<?php echo $recipe->id; ?>" class="disable_drink"><span class="drink-title"><?php echo $recipe->name ?></span></a>
                                    <?php endif; ?>
                                </li>  
                                <?php $counter++; ?>
                            <?php endforeach; ?>
                        </ul>
                        <div id="topLoader"></div>
                        <ul id="menu_footer">
                            <li>Place your cup below. Press menu button to begin</li>
                            <li>Select a drink, press serve to confirm</li>
                            <li>Your Drink is now being mixed</li>
                            <li>Enjoy</li>
                        </ul>
                    </div>
                </section>
            </div>
        </div>
            
        <script src="/Scripts/lib/LAB.js"></script>
        <script>
            $LAB
                .script('/Scripts/modernizr-2.5.3.js').wait()
                .script('/Scripts/jquery-1.8.2.js').wait()

                .script('/Scripts/lib/jquery.percentageloader-0.1.js').wait()
                .script('/Scripts/jquery.easing.1.3.js').wait()

                .script('/Scripts/app/menu.js').wait(function () {
                    App.Global.init();
                });
        </script>
    </body>
</html>




