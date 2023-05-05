<template>
    <q-layout view="lHh LpR lFf" style="font-family: Lato;"><!--
    <q-header reveal elevated style="background-color: #1f509e;"> -->

        <q-header reveal elevated style="background-color: #1f509e;">
            <q-toolbar v-if="$q.platform.is.desktop" class="q-py-sm">
                <!--          <q-btn @click="left = !left" flat round dense icon="menu" class="q-mr-sm" />-->
                <img class="cursor-pointer" src="../images/logo.png" style="width: 3%"/>
                <q-toolbar-title>
                    <span class="float-left q-mt-xs text-h6 text-weight-bold" style="font-size: 17px;">Artstore</span>

                </q-toolbar-title>
            </q-toolbar>

        </q-header>


        <q-page-container style="background-color:#f1f2f6;">
            <router-view/>

        </q-page-container>


    </q-layout>
</template>

<script>
export default {
    data() {
        return {
            left: false,
            menu_cat_elc: false,
            menu_cat_tvs: false,
            menu_cat_men: false,
            text: ''
        }
    }
}
</script>

<style>

.hover-blue:hover {
    color: #1f509e;
}

.hover_underline_white:hover {
    text-decoration: underline !important;
    cursor: pointer;
}

.hover_border_grey:hover {
    border: 1px solid lightgrey;
    cursor: pointer;
    border-radius: 3px;
}
</style>
