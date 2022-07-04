'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">spotify-server documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                        <li class="link">
                            <a href="license.html"  data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>LICENSE
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AdminModule.html" data-type="entity-link" >AdminModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-AdminModule-7ff4a0e7724876b8585d3bc9fce7b847ff3563da313509b13d097f2071c588666c2ba3f33674939b9a83ad573bc2361b4aec52ecbe0951ecf3feba759dd62f21"' : 'data-target="#xs-controllers-links-module-AdminModule-7ff4a0e7724876b8585d3bc9fce7b847ff3563da313509b13d097f2071c588666c2ba3f33674939b9a83ad573bc2361b4aec52ecbe0951ecf3feba759dd62f21"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AdminModule-7ff4a0e7724876b8585d3bc9fce7b847ff3563da313509b13d097f2071c588666c2ba3f33674939b9a83ad573bc2361b4aec52ecbe0951ecf3feba759dd62f21"' :
                                            'id="xs-controllers-links-module-AdminModule-7ff4a0e7724876b8585d3bc9fce7b847ff3563da313509b13d097f2071c588666c2ba3f33674939b9a83ad573bc2361b4aec52ecbe0951ecf3feba759dd62f21"' }>
                                            <li class="link">
                                                <a href="controllers/AdminController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AdminController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AdminModule-7ff4a0e7724876b8585d3bc9fce7b847ff3563da313509b13d097f2071c588666c2ba3f33674939b9a83ad573bc2361b4aec52ecbe0951ecf3feba759dd62f21"' : 'data-target="#xs-injectables-links-module-AdminModule-7ff4a0e7724876b8585d3bc9fce7b847ff3563da313509b13d097f2071c588666c2ba3f33674939b9a83ad573bc2361b4aec52ecbe0951ecf3feba759dd62f21"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AdminModule-7ff4a0e7724876b8585d3bc9fce7b847ff3563da313509b13d097f2071c588666c2ba3f33674939b9a83ad573bc2361b4aec52ecbe0951ecf3feba759dd62f21"' :
                                        'id="xs-injectables-links-module-AdminModule-7ff4a0e7724876b8585d3bc9fce7b847ff3563da313509b13d097f2071c588666c2ba3f33674939b9a83ad573bc2361b4aec52ecbe0951ecf3feba759dd62f21"' }>
                                        <li class="link">
                                            <a href="injectables/AdminService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AdminService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AlbumModule.html" data-type="entity-link" >AlbumModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-AlbumModule-b4469d4208acff8b7f25fc51101a9d4b8b2e7940bf0bc80724d768546b6a2e05d7f08cd1f183f09f10a7d62552f7032989af7a5462d7d925f0b9a650b221f74d"' : 'data-target="#xs-controllers-links-module-AlbumModule-b4469d4208acff8b7f25fc51101a9d4b8b2e7940bf0bc80724d768546b6a2e05d7f08cd1f183f09f10a7d62552f7032989af7a5462d7d925f0b9a650b221f74d"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AlbumModule-b4469d4208acff8b7f25fc51101a9d4b8b2e7940bf0bc80724d768546b6a2e05d7f08cd1f183f09f10a7d62552f7032989af7a5462d7d925f0b9a650b221f74d"' :
                                            'id="xs-controllers-links-module-AlbumModule-b4469d4208acff8b7f25fc51101a9d4b8b2e7940bf0bc80724d768546b6a2e05d7f08cd1f183f09f10a7d62552f7032989af7a5462d7d925f0b9a650b221f74d"' }>
                                            <li class="link">
                                                <a href="controllers/AlbumController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AlbumController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AlbumModule-b4469d4208acff8b7f25fc51101a9d4b8b2e7940bf0bc80724d768546b6a2e05d7f08cd1f183f09f10a7d62552f7032989af7a5462d7d925f0b9a650b221f74d"' : 'data-target="#xs-injectables-links-module-AlbumModule-b4469d4208acff8b7f25fc51101a9d4b8b2e7940bf0bc80724d768546b6a2e05d7f08cd1f183f09f10a7d62552f7032989af7a5462d7d925f0b9a650b221f74d"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AlbumModule-b4469d4208acff8b7f25fc51101a9d4b8b2e7940bf0bc80724d768546b6a2e05d7f08cd1f183f09f10a7d62552f7032989af7a5462d7d925f0b9a650b221f74d"' :
                                        'id="xs-injectables-links-module-AlbumModule-b4469d4208acff8b7f25fc51101a9d4b8b2e7940bf0bc80724d768546b6a2e05d7f08cd1f183f09f10a7d62552f7032989af7a5462d7d925f0b9a650b221f74d"' }>
                                        <li class="link">
                                            <a href="injectables/AlbumService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AlbumService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-AppModule-5d4f9278929aaa7c0040c20de7df956c53bcaba39686f1844e7277d10d29a9b0ade420f0913f2f9925eb93ff99336c2c41dad81e468fe8e7768550d88319a21f"' : 'data-target="#xs-controllers-links-module-AppModule-5d4f9278929aaa7c0040c20de7df956c53bcaba39686f1844e7277d10d29a9b0ade420f0913f2f9925eb93ff99336c2c41dad81e468fe8e7768550d88319a21f"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-5d4f9278929aaa7c0040c20de7df956c53bcaba39686f1844e7277d10d29a9b0ade420f0913f2f9925eb93ff99336c2c41dad81e468fe8e7768550d88319a21f"' :
                                            'id="xs-controllers-links-module-AppModule-5d4f9278929aaa7c0040c20de7df956c53bcaba39686f1844e7277d10d29a9b0ade420f0913f2f9925eb93ff99336c2c41dad81e468fe8e7768550d88319a21f"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AppModule-5d4f9278929aaa7c0040c20de7df956c53bcaba39686f1844e7277d10d29a9b0ade420f0913f2f9925eb93ff99336c2c41dad81e468fe8e7768550d88319a21f"' : 'data-target="#xs-injectables-links-module-AppModule-5d4f9278929aaa7c0040c20de7df956c53bcaba39686f1844e7277d10d29a9b0ade420f0913f2f9925eb93ff99336c2c41dad81e468fe8e7768550d88319a21f"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-5d4f9278929aaa7c0040c20de7df956c53bcaba39686f1844e7277d10d29a9b0ade420f0913f2f9925eb93ff99336c2c41dad81e468fe8e7768550d88319a21f"' :
                                        'id="xs-injectables-links-module-AppModule-5d4f9278929aaa7c0040c20de7df956c53bcaba39686f1844e7277d10d29a9b0ade420f0913f2f9925eb93ff99336c2c41dad81e468fe8e7768550d88319a21f"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ArtistModule.html" data-type="entity-link" >ArtistModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-ArtistModule-9fa493693344a2bc15fa34a5a532ee1c987e025397151c18885ff2feecc58f45da93b22daf35b2716713b4766d58dc9b477608299f9b61c5e7181297575625ec"' : 'data-target="#xs-controllers-links-module-ArtistModule-9fa493693344a2bc15fa34a5a532ee1c987e025397151c18885ff2feecc58f45da93b22daf35b2716713b4766d58dc9b477608299f9b61c5e7181297575625ec"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ArtistModule-9fa493693344a2bc15fa34a5a532ee1c987e025397151c18885ff2feecc58f45da93b22daf35b2716713b4766d58dc9b477608299f9b61c5e7181297575625ec"' :
                                            'id="xs-controllers-links-module-ArtistModule-9fa493693344a2bc15fa34a5a532ee1c987e025397151c18885ff2feecc58f45da93b22daf35b2716713b4766d58dc9b477608299f9b61c5e7181297575625ec"' }>
                                            <li class="link">
                                                <a href="controllers/ArtistController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ArtistController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-ArtistModule-9fa493693344a2bc15fa34a5a532ee1c987e025397151c18885ff2feecc58f45da93b22daf35b2716713b4766d58dc9b477608299f9b61c5e7181297575625ec"' : 'data-target="#xs-injectables-links-module-ArtistModule-9fa493693344a2bc15fa34a5a532ee1c987e025397151c18885ff2feecc58f45da93b22daf35b2716713b4766d58dc9b477608299f9b61c5e7181297575625ec"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ArtistModule-9fa493693344a2bc15fa34a5a532ee1c987e025397151c18885ff2feecc58f45da93b22daf35b2716713b4766d58dc9b477608299f9b61c5e7181297575625ec"' :
                                        'id="xs-injectables-links-module-ArtistModule-9fa493693344a2bc15fa34a5a532ee1c987e025397151c18885ff2feecc58f45da93b22daf35b2716713b4766d58dc9b477608299f9b61c5e7181297575625ec"' }>
                                        <li class="link">
                                            <a href="injectables/ArtistService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ArtistService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-AuthModule-45db48b3ff5182b08ecd7b055873dcaa0cf3dacdac331bad329ced223567cf39f9ccd88c2b4637ba1c3c4c8a20221e09b2043a021fb6a939c2cba241a36e84cb"' : 'data-target="#xs-controllers-links-module-AuthModule-45db48b3ff5182b08ecd7b055873dcaa0cf3dacdac331bad329ced223567cf39f9ccd88c2b4637ba1c3c4c8a20221e09b2043a021fb6a939c2cba241a36e84cb"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-45db48b3ff5182b08ecd7b055873dcaa0cf3dacdac331bad329ced223567cf39f9ccd88c2b4637ba1c3c4c8a20221e09b2043a021fb6a939c2cba241a36e84cb"' :
                                            'id="xs-controllers-links-module-AuthModule-45db48b3ff5182b08ecd7b055873dcaa0cf3dacdac331bad329ced223567cf39f9ccd88c2b4637ba1c3c4c8a20221e09b2043a021fb6a939c2cba241a36e84cb"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AuthModule-45db48b3ff5182b08ecd7b055873dcaa0cf3dacdac331bad329ced223567cf39f9ccd88c2b4637ba1c3c4c8a20221e09b2043a021fb6a939c2cba241a36e84cb"' : 'data-target="#xs-injectables-links-module-AuthModule-45db48b3ff5182b08ecd7b055873dcaa0cf3dacdac331bad329ced223567cf39f9ccd88c2b4637ba1c3c4c8a20221e09b2043a021fb6a939c2cba241a36e84cb"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-45db48b3ff5182b08ecd7b055873dcaa0cf3dacdac331bad329ced223567cf39f9ccd88c2b4637ba1c3c4c8a20221e09b2043a021fb6a939c2cba241a36e84cb"' :
                                        'id="xs-injectables-links-module-AuthModule-45db48b3ff5182b08ecd7b055873dcaa0cf3dacdac331bad329ced223567cf39f9ccd88c2b4637ba1c3c4c8a20221e09b2043a021fb6a939c2cba241a36e84cb"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/JwtStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JwtStrategy</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/CategoryModule.html" data-type="entity-link" >CategoryModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-CategoryModule-7de02d697ae462bc56f8ae9d71421959c1e553d0c0af1f5c160166880ccde9b89f5cbd96fd14fb0dffc19995dd6be63ef9d1e6faee53f04fd035ec1d9cefdd48"' : 'data-target="#xs-controllers-links-module-CategoryModule-7de02d697ae462bc56f8ae9d71421959c1e553d0c0af1f5c160166880ccde9b89f5cbd96fd14fb0dffc19995dd6be63ef9d1e6faee53f04fd035ec1d9cefdd48"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-CategoryModule-7de02d697ae462bc56f8ae9d71421959c1e553d0c0af1f5c160166880ccde9b89f5cbd96fd14fb0dffc19995dd6be63ef9d1e6faee53f04fd035ec1d9cefdd48"' :
                                            'id="xs-controllers-links-module-CategoryModule-7de02d697ae462bc56f8ae9d71421959c1e553d0c0af1f5c160166880ccde9b89f5cbd96fd14fb0dffc19995dd6be63ef9d1e6faee53f04fd035ec1d9cefdd48"' }>
                                            <li class="link">
                                                <a href="controllers/CategoryController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CategoryController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-CategoryModule-7de02d697ae462bc56f8ae9d71421959c1e553d0c0af1f5c160166880ccde9b89f5cbd96fd14fb0dffc19995dd6be63ef9d1e6faee53f04fd035ec1d9cefdd48"' : 'data-target="#xs-injectables-links-module-CategoryModule-7de02d697ae462bc56f8ae9d71421959c1e553d0c0af1f5c160166880ccde9b89f5cbd96fd14fb0dffc19995dd6be63ef9d1e6faee53f04fd035ec1d9cefdd48"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-CategoryModule-7de02d697ae462bc56f8ae9d71421959c1e553d0c0af1f5c160166880ccde9b89f5cbd96fd14fb0dffc19995dd6be63ef9d1e6faee53f04fd035ec1d9cefdd48"' :
                                        'id="xs-injectables-links-module-CategoryModule-7de02d697ae462bc56f8ae9d71421959c1e553d0c0af1f5c160166880ccde9b89f5cbd96fd14fb0dffc19995dd6be63ef9d1e6faee53f04fd035ec1d9cefdd48"' }>
                                        <li class="link">
                                            <a href="injectables/CategoryService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CategoryService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/CountryModule.html" data-type="entity-link" >CountryModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-CountryModule-033266004060041ac65a5a4b4fd50e29291c6f824ced416fbb9161975e4db0416a45ee4df38175e941e29f95561b0c8485fd03a6e983021f75a2409dcef190c1"' : 'data-target="#xs-controllers-links-module-CountryModule-033266004060041ac65a5a4b4fd50e29291c6f824ced416fbb9161975e4db0416a45ee4df38175e941e29f95561b0c8485fd03a6e983021f75a2409dcef190c1"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-CountryModule-033266004060041ac65a5a4b4fd50e29291c6f824ced416fbb9161975e4db0416a45ee4df38175e941e29f95561b0c8485fd03a6e983021f75a2409dcef190c1"' :
                                            'id="xs-controllers-links-module-CountryModule-033266004060041ac65a5a4b4fd50e29291c6f824ced416fbb9161975e4db0416a45ee4df38175e941e29f95561b0c8485fd03a6e983021f75a2409dcef190c1"' }>
                                            <li class="link">
                                                <a href="controllers/CountryController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CountryController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-CountryModule-033266004060041ac65a5a4b4fd50e29291c6f824ced416fbb9161975e4db0416a45ee4df38175e941e29f95561b0c8485fd03a6e983021f75a2409dcef190c1"' : 'data-target="#xs-injectables-links-module-CountryModule-033266004060041ac65a5a4b4fd50e29291c6f824ced416fbb9161975e4db0416a45ee4df38175e941e29f95561b0c8485fd03a6e983021f75a2409dcef190c1"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-CountryModule-033266004060041ac65a5a4b4fd50e29291c6f824ced416fbb9161975e4db0416a45ee4df38175e941e29f95561b0c8485fd03a6e983021f75a2409dcef190c1"' :
                                        'id="xs-injectables-links-module-CountryModule-033266004060041ac65a5a4b4fd50e29291c6f824ced416fbb9161975e4db0416a45ee4df38175e941e29f95561b0c8485fd03a6e983021f75a2409dcef190c1"' }>
                                        <li class="link">
                                            <a href="injectables/CountryService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CountryService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PlaylistModule.html" data-type="entity-link" >PlaylistModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-PlaylistModule-b08c0e737b54bb1e692ca1d26c82b5eb7908f5bf1954c9bc757c5e0c06b934dd3a15676e1ee38a1ba5b70894b5b94960deefded63aba15abb75e05de7db9465b"' : 'data-target="#xs-controllers-links-module-PlaylistModule-b08c0e737b54bb1e692ca1d26c82b5eb7908f5bf1954c9bc757c5e0c06b934dd3a15676e1ee38a1ba5b70894b5b94960deefded63aba15abb75e05de7db9465b"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-PlaylistModule-b08c0e737b54bb1e692ca1d26c82b5eb7908f5bf1954c9bc757c5e0c06b934dd3a15676e1ee38a1ba5b70894b5b94960deefded63aba15abb75e05de7db9465b"' :
                                            'id="xs-controllers-links-module-PlaylistModule-b08c0e737b54bb1e692ca1d26c82b5eb7908f5bf1954c9bc757c5e0c06b934dd3a15676e1ee38a1ba5b70894b5b94960deefded63aba15abb75e05de7db9465b"' }>
                                            <li class="link">
                                                <a href="controllers/PlaylistController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PlaylistController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-PlaylistModule-b08c0e737b54bb1e692ca1d26c82b5eb7908f5bf1954c9bc757c5e0c06b934dd3a15676e1ee38a1ba5b70894b5b94960deefded63aba15abb75e05de7db9465b"' : 'data-target="#xs-injectables-links-module-PlaylistModule-b08c0e737b54bb1e692ca1d26c82b5eb7908f5bf1954c9bc757c5e0c06b934dd3a15676e1ee38a1ba5b70894b5b94960deefded63aba15abb75e05de7db9465b"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PlaylistModule-b08c0e737b54bb1e692ca1d26c82b5eb7908f5bf1954c9bc757c5e0c06b934dd3a15676e1ee38a1ba5b70894b5b94960deefded63aba15abb75e05de7db9465b"' :
                                        'id="xs-injectables-links-module-PlaylistModule-b08c0e737b54bb1e692ca1d26c82b5eb7908f5bf1954c9bc757c5e0c06b934dd3a15676e1ee38a1ba5b70894b5b94960deefded63aba15abb75e05de7db9465b"' }>
                                        <li class="link">
                                            <a href="injectables/PlaylistService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PlaylistService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PrismaModule.html" data-type="entity-link" >PrismaModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-PrismaModule-8a45c52f5bc506f9fcef1f4c7b34e596b06323bae0951c4fe354cc2b76489f6abcf1207439120a4bd3a6cf40174b139cda70f7a558a3f53d9bcdd3a9e74b81bf"' : 'data-target="#xs-injectables-links-module-PrismaModule-8a45c52f5bc506f9fcef1f4c7b34e596b06323bae0951c4fe354cc2b76489f6abcf1207439120a4bd3a6cf40174b139cda70f7a558a3f53d9bcdd3a9e74b81bf"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PrismaModule-8a45c52f5bc506f9fcef1f4c7b34e596b06323bae0951c4fe354cc2b76489f6abcf1207439120a4bd3a6cf40174b139cda70f7a558a3f53d9bcdd3a9e74b81bf"' :
                                        'id="xs-injectables-links-module-PrismaModule-8a45c52f5bc506f9fcef1f4c7b34e596b06323bae0951c4fe354cc2b76489f6abcf1207439120a4bd3a6cf40174b139cda70f7a558a3f53d9bcdd3a9e74b81bf"' }>
                                        <li class="link">
                                            <a href="injectables/PrismaService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PrismaService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ProfileFavoriteSongModule.html" data-type="entity-link" >ProfileFavoriteSongModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-ProfileFavoriteSongModule-1ba0b94632d5ed78dd2f33f159d65cf21eca9a840fc1a013c45504d23437fb699e140ec1ca638c48c5b51769d76b4f42db5b9da993b0e78373d9895f2dad2d40"' : 'data-target="#xs-controllers-links-module-ProfileFavoriteSongModule-1ba0b94632d5ed78dd2f33f159d65cf21eca9a840fc1a013c45504d23437fb699e140ec1ca638c48c5b51769d76b4f42db5b9da993b0e78373d9895f2dad2d40"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ProfileFavoriteSongModule-1ba0b94632d5ed78dd2f33f159d65cf21eca9a840fc1a013c45504d23437fb699e140ec1ca638c48c5b51769d76b4f42db5b9da993b0e78373d9895f2dad2d40"' :
                                            'id="xs-controllers-links-module-ProfileFavoriteSongModule-1ba0b94632d5ed78dd2f33f159d65cf21eca9a840fc1a013c45504d23437fb699e140ec1ca638c48c5b51769d76b4f42db5b9da993b0e78373d9895f2dad2d40"' }>
                                            <li class="link">
                                                <a href="controllers/ProfileFavoriteSongController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProfileFavoriteSongController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-ProfileFavoriteSongModule-1ba0b94632d5ed78dd2f33f159d65cf21eca9a840fc1a013c45504d23437fb699e140ec1ca638c48c5b51769d76b4f42db5b9da993b0e78373d9895f2dad2d40"' : 'data-target="#xs-injectables-links-module-ProfileFavoriteSongModule-1ba0b94632d5ed78dd2f33f159d65cf21eca9a840fc1a013c45504d23437fb699e140ec1ca638c48c5b51769d76b4f42db5b9da993b0e78373d9895f2dad2d40"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ProfileFavoriteSongModule-1ba0b94632d5ed78dd2f33f159d65cf21eca9a840fc1a013c45504d23437fb699e140ec1ca638c48c5b51769d76b4f42db5b9da993b0e78373d9895f2dad2d40"' :
                                        'id="xs-injectables-links-module-ProfileFavoriteSongModule-1ba0b94632d5ed78dd2f33f159d65cf21eca9a840fc1a013c45504d23437fb699e140ec1ca638c48c5b51769d76b4f42db5b9da993b0e78373d9895f2dad2d40"' }>
                                        <li class="link">
                                            <a href="injectables/ProfileFavoriteSongService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProfileFavoriteSongService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ProfileModule.html" data-type="entity-link" >ProfileModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-ProfileModule-7509028e967f367c7a7fed087d0cce44add88bc8cf0871c87fb824b28b75186b83d5057192110df3ab2752a92239bb0f26ef33741784a44f194257a5faed0761"' : 'data-target="#xs-controllers-links-module-ProfileModule-7509028e967f367c7a7fed087d0cce44add88bc8cf0871c87fb824b28b75186b83d5057192110df3ab2752a92239bb0f26ef33741784a44f194257a5faed0761"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ProfileModule-7509028e967f367c7a7fed087d0cce44add88bc8cf0871c87fb824b28b75186b83d5057192110df3ab2752a92239bb0f26ef33741784a44f194257a5faed0761"' :
                                            'id="xs-controllers-links-module-ProfileModule-7509028e967f367c7a7fed087d0cce44add88bc8cf0871c87fb824b28b75186b83d5057192110df3ab2752a92239bb0f26ef33741784a44f194257a5faed0761"' }>
                                            <li class="link">
                                                <a href="controllers/ProfileController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProfileController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-ProfileModule-7509028e967f367c7a7fed087d0cce44add88bc8cf0871c87fb824b28b75186b83d5057192110df3ab2752a92239bb0f26ef33741784a44f194257a5faed0761"' : 'data-target="#xs-injectables-links-module-ProfileModule-7509028e967f367c7a7fed087d0cce44add88bc8cf0871c87fb824b28b75186b83d5057192110df3ab2752a92239bb0f26ef33741784a44f194257a5faed0761"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ProfileModule-7509028e967f367c7a7fed087d0cce44add88bc8cf0871c87fb824b28b75186b83d5057192110df3ab2752a92239bb0f26ef33741784a44f194257a5faed0761"' :
                                        'id="xs-injectables-links-module-ProfileModule-7509028e967f367c7a7fed087d0cce44add88bc8cf0871c87fb824b28b75186b83d5057192110df3ab2752a92239bb0f26ef33741784a44f194257a5faed0761"' }>
                                        <li class="link">
                                            <a href="injectables/ProfileService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProfileService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/SongModule.html" data-type="entity-link" >SongModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-SongModule-ba95ba52f5a9753468740d2f2cb6bebe868d1dd640015c1bbca30db5031580dfcadaa5f7d976920d1a9e57aff1367b18a8026c3419306e1c9e0bd9ad6827fa33"' : 'data-target="#xs-controllers-links-module-SongModule-ba95ba52f5a9753468740d2f2cb6bebe868d1dd640015c1bbca30db5031580dfcadaa5f7d976920d1a9e57aff1367b18a8026c3419306e1c9e0bd9ad6827fa33"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-SongModule-ba95ba52f5a9753468740d2f2cb6bebe868d1dd640015c1bbca30db5031580dfcadaa5f7d976920d1a9e57aff1367b18a8026c3419306e1c9e0bd9ad6827fa33"' :
                                            'id="xs-controllers-links-module-SongModule-ba95ba52f5a9753468740d2f2cb6bebe868d1dd640015c1bbca30db5031580dfcadaa5f7d976920d1a9e57aff1367b18a8026c3419306e1c9e0bd9ad6827fa33"' }>
                                            <li class="link">
                                                <a href="controllers/SongController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SongController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-SongModule-ba95ba52f5a9753468740d2f2cb6bebe868d1dd640015c1bbca30db5031580dfcadaa5f7d976920d1a9e57aff1367b18a8026c3419306e1c9e0bd9ad6827fa33"' : 'data-target="#xs-injectables-links-module-SongModule-ba95ba52f5a9753468740d2f2cb6bebe868d1dd640015c1bbca30db5031580dfcadaa5f7d976920d1a9e57aff1367b18a8026c3419306e1c9e0bd9ad6827fa33"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-SongModule-ba95ba52f5a9753468740d2f2cb6bebe868d1dd640015c1bbca30db5031580dfcadaa5f7d976920d1a9e57aff1367b18a8026c3419306e1c9e0bd9ad6827fa33"' :
                                        'id="xs-injectables-links-module-SongModule-ba95ba52f5a9753468740d2f2cb6bebe868d1dd640015c1bbca30db5031580dfcadaa5f7d976920d1a9e57aff1367b18a8026c3419306e1c9e0bd9ad6827fa33"' }>
                                        <li class="link">
                                            <a href="injectables/SongService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SongService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UserModule.html" data-type="entity-link" >UserModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-UserModule-d8888bd8875e890a1ad9f4c5dd8553b5029956d4782afd0793d31f8087b4a62f842e221a8490ec0824e02b957203fa09480f1cfb2e82d2ec3413061158c2f020"' : 'data-target="#xs-controllers-links-module-UserModule-d8888bd8875e890a1ad9f4c5dd8553b5029956d4782afd0793d31f8087b4a62f842e221a8490ec0824e02b957203fa09480f1cfb2e82d2ec3413061158c2f020"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UserModule-d8888bd8875e890a1ad9f4c5dd8553b5029956d4782afd0793d31f8087b4a62f842e221a8490ec0824e02b957203fa09480f1cfb2e82d2ec3413061158c2f020"' :
                                            'id="xs-controllers-links-module-UserModule-d8888bd8875e890a1ad9f4c5dd8553b5029956d4782afd0793d31f8087b4a62f842e221a8490ec0824e02b957203fa09480f1cfb2e82d2ec3413061158c2f020"' }>
                                            <li class="link">
                                                <a href="controllers/UserController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-UserModule-d8888bd8875e890a1ad9f4c5dd8553b5029956d4782afd0793d31f8087b4a62f842e221a8490ec0824e02b957203fa09480f1cfb2e82d2ec3413061158c2f020"' : 'data-target="#xs-injectables-links-module-UserModule-d8888bd8875e890a1ad9f4c5dd8553b5029956d4782afd0793d31f8087b4a62f842e221a8490ec0824e02b957203fa09480f1cfb2e82d2ec3413061158c2f020"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UserModule-d8888bd8875e890a1ad9f4c5dd8553b5029956d4782afd0793d31f8087b4a62f842e221a8490ec0824e02b957203fa09480f1cfb2e82d2ec3413061158c2f020"' :
                                        'id="xs-injectables-links-module-UserModule-d8888bd8875e890a1ad9f4c5dd8553b5029956d4782afd0793d31f8087b4a62f842e221a8490ec0824e02b957203fa09480f1cfb2e82d2ec3413061158c2f020"' }>
                                        <li class="link">
                                            <a href="injectables/UserService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UserPlanModule.html" data-type="entity-link" >UserPlanModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-UserPlanModule-75ab76549eb57c8f14c88749c1cd76b5d9fb20399e2628e73bc157151b67139459d7cdca168be1bdd18666bda9f4f22a1d40a50445a8c7de20ddce439afcec18"' : 'data-target="#xs-controllers-links-module-UserPlanModule-75ab76549eb57c8f14c88749c1cd76b5d9fb20399e2628e73bc157151b67139459d7cdca168be1bdd18666bda9f4f22a1d40a50445a8c7de20ddce439afcec18"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UserPlanModule-75ab76549eb57c8f14c88749c1cd76b5d9fb20399e2628e73bc157151b67139459d7cdca168be1bdd18666bda9f4f22a1d40a50445a8c7de20ddce439afcec18"' :
                                            'id="xs-controllers-links-module-UserPlanModule-75ab76549eb57c8f14c88749c1cd76b5d9fb20399e2628e73bc157151b67139459d7cdca168be1bdd18666bda9f4f22a1d40a50445a8c7de20ddce439afcec18"' }>
                                            <li class="link">
                                                <a href="controllers/UserPlanController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserPlanController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-UserPlanModule-75ab76549eb57c8f14c88749c1cd76b5d9fb20399e2628e73bc157151b67139459d7cdca168be1bdd18666bda9f4f22a1d40a50445a8c7de20ddce439afcec18"' : 'data-target="#xs-injectables-links-module-UserPlanModule-75ab76549eb57c8f14c88749c1cd76b5d9fb20399e2628e73bc157151b67139459d7cdca168be1bdd18666bda9f4f22a1d40a50445a8c7de20ddce439afcec18"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UserPlanModule-75ab76549eb57c8f14c88749c1cd76b5d9fb20399e2628e73bc157151b67139459d7cdca168be1bdd18666bda9f4f22a1d40a50445a8c7de20ddce439afcec18"' :
                                        'id="xs-injectables-links-module-UserPlanModule-75ab76549eb57c8f14c88749c1cd76b5d9fb20399e2628e73bc157151b67139459d7cdca168be1bdd18666bda9f4f22a1d40a50445a8c7de20ddce439afcec18"' }>
                                        <li class="link">
                                            <a href="injectables/UserPlanService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserPlanService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#controllers-links"' :
                                'data-target="#xs-controllers-links"' }>
                                <span class="icon ion-md-swap"></span>
                                <span>Controllers</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="controllers-links"' : 'id="xs-controllers-links"' }>
                                <li class="link">
                                    <a href="controllers/AdminController.html" data-type="entity-link" >AdminController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/AlbumController.html" data-type="entity-link" >AlbumController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/AppController.html" data-type="entity-link" >AppController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/ArtistController.html" data-type="entity-link" >ArtistController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/AuthController.html" data-type="entity-link" >AuthController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/CategoryController.html" data-type="entity-link" >CategoryController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/CountryController.html" data-type="entity-link" >CountryController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/PlaylistController.html" data-type="entity-link" >PlaylistController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/ProfileController.html" data-type="entity-link" >ProfileController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/ProfileFavoriteSongController.html" data-type="entity-link" >ProfileFavoriteSongController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/SongController.html" data-type="entity-link" >SongController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/UserController.html" data-type="entity-link" >UserController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/UserPlanController.html" data-type="entity-link" >UserPlanController</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/AddSongPlaylistDto.html" data-type="entity-link" >AddSongPlaylistDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/Admin.html" data-type="entity-link" >Admin</a>
                            </li>
                            <li class="link">
                                <a href="classes/Album.html" data-type="entity-link" >Album</a>
                            </li>
                            <li class="link">
                                <a href="classes/Artist.html" data-type="entity-link" >Artist</a>
                            </li>
                            <li class="link">
                                <a href="classes/Category.html" data-type="entity-link" >Category</a>
                            </li>
                            <li class="link">
                                <a href="classes/Country.html" data-type="entity-link" >Country</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateAdminDto.html" data-type="entity-link" >CreateAdminDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateAlbumDto.html" data-type="entity-link" >CreateAlbumDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateArtistDto.html" data-type="entity-link" >CreateArtistDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateCategoryDto.html" data-type="entity-link" >CreateCategoryDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateCountryDto.html" data-type="entity-link" >CreateCountryDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreatePlaylistDto.html" data-type="entity-link" >CreatePlaylistDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateProfileDto.html" data-type="entity-link" >CreateProfileDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateProfileFavoriteSongDto.html" data-type="entity-link" >CreateProfileFavoriteSongDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateSongDto.html" data-type="entity-link" >CreateSongDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUserDto.html" data-type="entity-link" >CreateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUserPlanDto.html" data-type="entity-link" >CreateUserPlanDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/LoginDto.html" data-type="entity-link" >LoginDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/LoginProfileDto.html" data-type="entity-link" >LoginProfileDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/LoginUserResponseDto.html" data-type="entity-link" >LoginUserResponseDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/Music.html" data-type="entity-link" >Music</a>
                            </li>
                            <li class="link">
                                <a href="classes/Playlist.html" data-type="entity-link" >Playlist</a>
                            </li>
                            <li class="link">
                                <a href="classes/Profile.html" data-type="entity-link" >Profile</a>
                            </li>
                            <li class="link">
                                <a href="classes/ProfileFavoriteSong.html" data-type="entity-link" >ProfileFavoriteSong</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateAdminDto.html" data-type="entity-link" >UpdateAdminDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateAlbumDto.html" data-type="entity-link" >UpdateAlbumDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateArtistDto.html" data-type="entity-link" >UpdateArtistDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateCategoryDto.html" data-type="entity-link" >UpdateCategoryDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateCountryDto.html" data-type="entity-link" >UpdateCountryDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdatePlaylistDto.html" data-type="entity-link" >UpdatePlaylistDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateProfileDto.html" data-type="entity-link" >UpdateProfileDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateSongDto.html" data-type="entity-link" >UpdateSongDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateUserDto.html" data-type="entity-link" >UpdateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateUserPlanDto.html" data-type="entity-link" >UpdateUserPlanDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/User.html" data-type="entity-link" >User</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserPlan.html" data-type="entity-link" >UserPlan</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserProfileId.html" data-type="entity-link" >UserProfileId</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AdminService.html" data-type="entity-link" >AdminService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AlbumService.html" data-type="entity-link" >AlbumService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AppService.html" data-type="entity-link" >AppService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ArtistService.html" data-type="entity-link" >ArtistService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CategoryService.html" data-type="entity-link" >CategoryService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CountryService.html" data-type="entity-link" >CountryService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JwtStrategy.html" data-type="entity-link" >JwtStrategy</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PlaylistService.html" data-type="entity-link" >PlaylistService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PrismaService.html" data-type="entity-link" >PrismaService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ProfileFavoriteSongService.html" data-type="entity-link" >ProfileFavoriteSongService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ProfileService.html" data-type="entity-link" >ProfileService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SongService.html" data-type="entity-link" >SongService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserPlanService.html" data-type="entity-link" >UserPlanService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserService.html" data-type="entity-link" >UserService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});